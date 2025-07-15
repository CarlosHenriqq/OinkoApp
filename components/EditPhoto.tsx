import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function EditPhoto() {
  const [imagem, setImagem] = useState<string | null>(null);

  useEffect(() => {
    async function carregarImagemSalva() {
      const imagemSalva = await AsyncStorage.getItem('fotoPerfil');
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
      await AsyncStorage.setItem('fotoPerfil', uriSelecionada);
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
