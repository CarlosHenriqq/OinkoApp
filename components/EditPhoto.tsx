import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import PerflPadrao from '../assets/images/cabeca.svg';
import { API_BASE_URL, ENDPOINTS } from '../src/config/api';

const { width } = Dimensions.get('window');
const BASE_WIDTH = 390;
const scale = width / BASE_WIDTH;
const scaled = (size: number) => size * scale;

type Props = {
  imagem?: string;
};

export default function EditPhoto({ imagem }: Props) {
  const [imagemInterna, setImagemInterna] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      async function carregarImagem() {
        try {
          // Primeiro tenta pegar o path local salvo
          const localPath = await AsyncStorage.getItem('localFotoPerfil');
          if (localPath) {
            // Verifica se arquivo local existe
            const fileInfo = await FileSystem.getInfoAsync(localPath);
            if (fileInfo.exists) {
              setImagemInterna(localPath);
              return;
            } else {
              // Se arquivo local não existir, apaga do async para baixar de novo
              await AsyncStorage.removeItem('localFotoPerfil');
            }
          }

          // Se não tiver path local válido, tenta baixar da prop imagem (url do servidor)
          if (imagem) {
            // Define path local onde salvar
            const localFileUri = FileSystem.documentDirectory + 'fotoPerfil.jpg';

            // Baixa imagem do servidor para localFileUri
            const downloadResumable = FileSystem.createDownloadResumable(
              imagem,
              localFileUri
            );

            await downloadResumable.downloadAsync();

            // Salva path local no AsyncStorage e usa local
            await AsyncStorage.setItem('localFotoPerfil', localFileUri);
            setImagemInterna(localFileUri);
          }
        } catch (error) {
          console.log('Erro ao carregar imagem local:', error);
          // Fallback: mostra imagem da url direto
          if (imagem) setImagemInterna(imagem);
        }
      }

      carregarImagem();
    }, [imagem])
  );

  async function escolherImagem() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Permita o acesso à galeria para selecionar uma imagem.'
      );
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled) {
      const uriSelecionada = resultado.assets[0].uri;
      setImagemInterna(uriSelecionada);

      // Salva a nova imagem localmente no AsyncStorage e limpa cache antigo
      await AsyncStorage.setItem('fotoPerfil', uriSelecionada);
      await AsyncStorage.removeItem('localFotoPerfil'); // limpar cache local para forçar update

      // Upload para backend
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Erro', 'Usuário não autenticado');
        return;
      }

      const formData = new FormData();
      formData.append('foto', {
        uri: uriSelecionada,
        name: 'foto.jpg',
        type: 'image/jpeg',
      } as any);

      try {
        const response = await fetch(
          `${API_BASE_URL}${ENDPOINTS.UPLOAD_PICTURE}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
              'usuario_id': userId,
            },
            body: formData,
          }
        );

        const data = await response.json();

        if (data.sucesso) {
          // Atualiza AsyncStorage com a url do backend
          await AsyncStorage.setItem('fotoPerfil', data.fotoPerfilUrl);

          // Apaga cache local da imagem antiga para forçar re-download da nova
          await AsyncStorage.removeItem('localFotoPerfil');

          // Atualiza state para baixar e mostrar a nova imagem
          setImagemInterna(null); // limpa pra trigger do useFocusEffect
          setTimeout(() => setImagemInterna(data.fotoPerfilUrl), 100); 
        } else {
          Alert.alert('Erro ao enviar foto para o servidor');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Erro na comunicação com o servidor');
      }
    }
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {imagemInterna ? (
  <Image source={{ uri: imagemInterna }} style={styles.foto} />
) : (
  <PerflPadrao width="100%" height="100%" />
)}


        <TouchableOpacity
          style={styles.iconeEditar}
          onPress={escolherImagem}
          activeOpacity={0.7}
        >
          <Ionicons name="camera-sharp" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaled(-60),
  },
  container: {
    position: 'relative',
    width: scaled(120),
    height: scaled(120),
    borderRadius: scaled(60),
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: scaled(3),
    borderColor: '#fff',
  },
  foto: {
    width: '100%',
    height: '100%',
    borderRadius: scaled(60),
  },
  iconeEditar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#526471',
    borderRadius: scaled(30),
    borderWidth: scaled(2),
    borderColor: '#fff',
    padding: scaled(5),
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scaled(1) },
    shadowOpacity: 0.3,
    shadowRadius: scaled(2),
  },
});
  