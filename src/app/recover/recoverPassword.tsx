import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../../components/botao";
import OTPInput from "../../../components/inputVerication";
import { API_BASE_URL, ENDPOINTS } from "../../config/api";

export default function RecoverPassword() {
  const [codigo, setCodigo] = useState('');

  async function handleValidarCodigo() {
    if (!codigo) {
      Alert.alert('Erro', 'Por favor, insira o código recebido.');
      return;
    }

    try {
      const email = await AsyncStorage.getItem('emailForgot');
      if (!email) {
        Alert.alert('Erro', 'Email não encontrado, tente novamente.');
        return;
      }

      const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.VALIDATE_RESET_CODE}/verify`, {
        email,
        code: codigo
      });
      AsyncStorage.setItem('emailRecover', email)
      if (response.data.valido) {
        router.push('/recover/changePassword');
      } else {
        Alert.alert('Erro', 'Código inválido ou expirado.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao validar código. Tente novamente.');
    }
  }

  async function handleReenviarCodigo() {
    try {
      const email = await AsyncStorage.getItem('emailForgot');
      if (!email) {
        Alert.alert('Erro', 'Email não encontrado, tente novamente.');
        return;
      }

      await axios.post(`${API_BASE_URL}${ENDPOINTS.VALIDATE_RESET_CODE}/forgot`, { email });
      Alert.alert('Sucesso', 'Código reenviado para seu e-mail.');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao reenviar código.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.textoSenha}>
        <Text style={{ color: '#4A4A4A', fontSize: 34, fontFamily: 'Manrope', fontWeight: "bold", maxWidth: 250, textAlign: 'center', lineHeight: 40 }}>
          Recuperação de senha
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ color: '#4A4A4A', fontSize: 16, fontFamily: 'Manrope', fontWeight: "normal", maxWidth: 300, textAlign: 'center' }}>
          Agora, insira o código que te enviamos por e-mail para criar uma <Text style={{ fontWeight: "bold" }}>nova senha</Text>
        </Text>
      </View>

      <View style={{ marginTop: 60 }}>
        <OTPInput onCodeFilled={setCodigo} />

      </View>

      <View style={{ marginTop: 10 }}>
        <TouchableOpacity onPress={handleReenviarCodigo}>
          <Text style={{ color: '#4A4A4A', fontSize: 12, fontFamily: 'Manrope', fontWeight: "bold", textDecorationLine: "underline", textAlign: 'center' }}>
            Reenviar código
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 50 }}>
        <Button title="Continuar" onPress={handleValidarCodigo} />
      </View>

      <View style={{ marginTop: 220 }}>
        <TouchableOpacity onPress={() => router.replace("/recover/forgetPassword")}>
          <Text style={{ color: '#4A4A4A', fontSize: 16, fontFamily: 'Manrope', fontWeight: "bold", textDecorationLine: "underline", textAlign: 'center' }}>
            Voltar para tela anterior
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
  },
});
