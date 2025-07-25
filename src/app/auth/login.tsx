import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Google from "../../../assets/images/google.svg";
import Logo from "../../../assets/images/logo.svg";
import { Button } from "../../../components/botao";
import Input from "../../../components/input";
import { API_BASE_URL, ENDPOINTS } from "../../config/api";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin() {
    try {
      const response = await axios.post(
        `${API_BASE_URL}${ENDPOINTS.LOGIN}`,
        { email, senha }
      );

      const userName = response.data.usuario.nome;
      const userId = response.data.usuario.id;
      const renda = response.data.usuario.renda;

      await AsyncStorage.setItem("userName", userName);
      await AsyncStorage.setItem("userId", userId.toString());
      await AsyncStorage.setItem("token", response.data.token);

      if (renda != null) {
        await AsyncStorage.setItem("renda", renda.toString());
      } else {
        await AsyncStorage.removeItem("renda");
      }

      Alert.alert("Sucesso", "Login realizado com sucesso!");
      router.replace("/pages/userDash");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Email ou senha inválidos.");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Logo width={280} style={styles.logo} />

      <Text style={styles.title}>Faça seu login</Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="E-mail"
          icon="mail-outline"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Senha"
          icon="lock-closed-outline"
          isPassword
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button title="Acessar" onPress={handleLogin} />
      </View>

      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <Text style={styles.separatorText}>Ou faça login com</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.googleBtn}>
        <Google />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/recover/forgetPassword")}>
        <Text style={styles.link}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Não possui uma conta?</Text>
        <TouchableOpacity onPress={() => router.replace("/auth/register")}>
          <Text style={[styles.link, { marginLeft: 4 }]}>Clique aqui</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E8F9",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    marginTop: 60,
    alignSelf: "center",
  },
  title: {
    fontSize: 34,
    fontFamily: "Manrope",
    fontWeight: "bold",
    color: "#4A4A4A",
    marginTop: 10,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 30,
    width: "100%",
    maxWidth: 400,
    alignItems:"center",
  },
  buttonWrapper: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    alignItems:"center",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    height: 1,
    backgroundColor: "#4A4A4A",
    width: 70,
  },
  separatorText: {
    marginHorizontal: 10,
    fontFamily: "Manrope",
    fontSize: 16,
    color: "#4A4A4A",
  },
  googleBtn: {
    backgroundColor: "white",
    borderRadius: 40,
    padding: 5,
    marginBottom: 20,
  },
  link: {
    textDecorationLine: "underline",
    color: "#4A4A4A",
    fontFamily: "Manrope",
    fontSize: 16,
  },
  registerContainer: {
    marginBottom: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  registerText: {
    color: "#4A4A4A",
    fontFamily: "Manrope",
    fontSize: 16,
  },
});
