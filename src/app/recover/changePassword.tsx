import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../../components/botao";
import Input from "../../../components/input";
import { API_BASE_URL, ENDPOINTS } from "../../config/api";

export default function ChangePassword() {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  async function handleAlterarSenha() {
    if (!novaSenha || !confirmaSenha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    if (novaSenha !== confirmaSenha) {
      Alert.alert('Erro', 'As senhas não conferem.');
      return;
    }

    try {
      // Se você tiver o usuário logado, pode buscar o id dele
      const userIdStr = await AsyncStorage.getItem('userId');
      const userId = userIdStr ? Number(userIdStr) : null;
      const email = await AsyncStorage.getItem('email')

      if (!userId) {
        Alert.alert('Erro', 'Usuário não identificado.');
        return;
      }

      await axios.put(`${API_BASE_URL}${ENDPOINTS.VALIDATE_RESET_CODE}/reset`, {
        email: email,
        nova_senha: novaSenha,
      });

      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      router.replace('/auth/login');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao alterar a senha. Tente novamente.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.textoSenha}>
        <Text style={{ color: '#4A4A4A', fontSize: 34, fontFamily: 'Manrope', fontWeight: "bold", maxWidth: 170, textAlign: 'center', lineHeight: 40 }}>
          Alterar sua senha</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ color: '#4A4A4A', fontSize: 16, fontFamily: 'Manrope', fontWeight: "normal", maxWidth: 220, textAlign: 'center' }}>
          Preencha os campos abaixo e crie uma <Text style={{ fontWeight: "bold" }}>nova senha</Text>
        </Text>
      </View>

      <View style={{ marginTop: 60 }}>
        <Input placeholder="Crie sua senha" icon="lock-closed-outline" isPassword value={novaSenha} onChangeText={setNovaSenha} error=""/>
        <Input placeholder="Repita sua senha" icon="lock-closed-outline" isPassword value={confirmaSenha} onChangeText={setConfirmaSenha} error=""/>
      </View>

      <View style={{ marginTop: 50 }}>
        <Button title="Redefinir senha" onPress={handleAlterarSenha} />
      </View>

      <View style={{ marginTop: 180, flexDirection: "row", gap: 5, }}>
        <TouchableOpacity onPress={() => router.replace("/auth/login")}>
          <Text style={{ color: '#4A4A4A', fontSize: 16, fontFamily: 'Manrope', fontWeight: "bold", textDecorationLine: "underline", maxWidth: 300, textAlign: 'center' }}>Voltar ao início</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E8F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoSenha: {
    marginTop: 40,
  }
});
