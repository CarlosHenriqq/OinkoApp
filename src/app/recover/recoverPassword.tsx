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
      await AsyncStorage.setItem('emailRecover', email);
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

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>
          Agora, insira o código que te enviamos por e-mail para criar uma{' '}
          <Text style={styles.boldText}>nova senha</Text>
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

      <View style={styles.buttonContainer}>
        {/* Agora chama a função de validação */}
        <Button title="Continuar" onPress={handleValidarCodigo} />
      </View>

      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => router.replace("/recover/forgetPassword")}>
          <Text style={styles.backLink}>Voltar para tela anterior</Text>
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
    paddingHorizontal: 24,
  },
  textoSenha: {
    marginTop: 40,
  },
  title: {
    color: '#4A4A4A',
    fontSize: 34,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    maxWidth: 250,
    textAlign: 'center',
    lineHeight: 40,
  },
  subtitleContainer: {
    marginTop: 20,
    maxWidth: 300,
    paddingHorizontal: 10,
  },
  subtitle: {
    color: '#4A4A4A',
    fontSize: 16,
    fontFamily: 'Manrope',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#4A4A4A',
    fontSize: 16,
    fontFamily: 'Manrope',
  },
  inputContainer: {
    marginTop: 60,
    width: '100%',
  },
  resendContainer: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
  },
  resendText: {
    color: '#4A4A4A',
    fontSize: 12,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    maxWidth: 300,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 45,
    width: '100%',
    alignItems:"center",
  },
  linkContainer: {
    marginTop: 220,
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backLink: {
    color: '#4A4A4A',
    fontSize: 16,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    maxWidth: 300,
    textAlign: 'center',
  },
});
