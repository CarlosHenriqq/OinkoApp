import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { API_BASE_URL, ENDPOINTS } from '../src/config/api';

export default function EditPhoto() {
  const [imagem, setImagem] = useState<string | null>(null);

 useEffect(() => {
  async function carregarImagemSalva() {
    let imagemSalva = await AsyncStorage.getItem('fotoPerfil');
console.log('Imagem carregada do AsyncStorage:', imagemSalva);
    if (imagemSalva && !imagemSalva.startsWith('http')) {
      // Se salvou relativo, corrigir adicionando o servidor
      imagemSalva = `${API_BASE_URL}${imagemSalva}`;
    }

    if (imagemSalva) setImagem(imagemSalva);
  }
  carregarImagemSalva();
}, []);


  async function escolherImagem() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permissão necessária', 'Permita o acesso à galeria para selecionar uma imagem.');
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
    setImagem(uriSelecionada);

    // Primeiro salva localmente
    await AsyncStorage.setItem('fotoPerfil', uriSelecionada);

    // Agora envia para o backend
    const userId = await AsyncStorage.getItem('userId'); // pegue o userId salvo
    if (!userId) {
      Alert.alert('Erro', 'Usuário não autenticado');
      return;
    }

    const formData = new FormData();
    formData.append('foto', {
      uri: uriSelecionada,
      name: 'foto.jpg',
      type: 'image/jpeg',
    } as any); // O "as any" resolve um problema de tipagem no React Native

    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.UPLOAD_PICTURE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'usuario_id': userId,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.sucesso) {
        // Salva no AsyncStorage a URL retornada pelo backend (ex: /uploads/xxx.jpg)
        await AsyncStorage.setItem('fotoPerfil', data.fotoPerfilUrl);
        setImagem(data.fotoPerfilUrl);
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
        <Image
          source={
            imagem
              ? { uri: imagem }
              : require('../assets/images/perfil.png') // ajuste o caminho conforme sua estrutura
          }
          style={styles.foto}
        />
        <TouchableOpacity style={styles.iconeEditar} onPress={escolherImagem} activeOpacity={0.7}>
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
    marginTop: -60,
  },
  container: {
  position: 'relative',
  width: 120,
  height: 120,
  borderRadius: 60,
  backgroundColor: '#FACFBC',
  // overflow: 'hidden', // remover essa linha
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 3,
  borderColor: '#fff',
},

  foto: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  iconeEditar: {
  position: 'absolute',
  bottom: 0, // valor negativo para o ícone sair do círculo
  right:0,  // idem para a direita
  backgroundColor: '#526471',
  borderRadius: 30,
  borderWidth: 2,
  borderColor: '#ffff',
  padding: 5, // maior para ficar mais arredondado e espaçoso
  zIndex: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.3,
  shadowRadius: 2,
},

});
