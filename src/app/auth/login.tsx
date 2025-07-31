import { useOAuth, useUser } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from "react";
import {
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
import ToastAlerta from "../../../components/toast";
import { API_BASE_URL, ENDPOINTS } from "../../config/api";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const googleOAuth = useOAuth({ strategy: "oauth_google" });
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Estados para erros nos inputs
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');

  const [googleLoginSuccess, setGoogleLoginSuccess] = useState(false);
  const [toastVisivel, setToastVisivel] = useState(false);
  const [tipo, setTipo] = useState<'sucesso' | 'erro'>('sucesso');
  const [mensagem, setMensagem] = useState('');

  function mostrarToast(texto: string, tipoAlerta: 'sucesso' | 'erro') {
    setMensagem(texto);
    setTipo(tipoAlerta);
    setToastVisivel(true);
    setTimeout(() => {
      setToastVisivel(false);
    }, 3000);
  }

  function esconderToast() {
    setToastVisivel(false);
  }

  // Quando login via Google ocorrer
  useEffect(() => {
  async function saveGoogleUser() {
    if (googleLoginSuccess && user?.emailAddresses?.[0]) {
      try {
        const userName = user.fullName || "Usuário";
        const userId = user.id;
        const userEmail = user.emailAddresses[0].emailAddress;

<<<<<<< HEAD
        const prevEmail = await AsyncStorage.getItem("email");
        if (prevEmail && prevEmail !== userEmail) {
          await AsyncStorage.removeItem("fotoPerfil");
=======
          const prevEmail = await AsyncStorage.getItem('email');
          if (prevEmail && prevEmail !== userEmail) {
            await AsyncStorage.removeItem('fotoPerfil');
          }

          await AsyncStorage.setItem('userName', userName);
          await AsyncStorage.setItem('userId', userId);
          await AsyncStorage.setItem('email', userEmail);
          await AsyncStorage.setItem('token', ''); // ou token do Clerk se desejar

          router.replace('/auth/registerFinance');
        } catch (e) {
          console.error('Erro ao salvar dados do usuário Google:', e);
        } finally {
          setGoogleLoginSuccess(false);
>>>>>>> dc042305f9fb21ed99635f740fbf5132e1b2bd7f
        }

        await AsyncStorage.setItem("userName", userName);
        await AsyncStorage.setItem("userId", userId);
        await AsyncStorage.setItem("email", userEmail);
        await AsyncStorage.setItem("token", '');

        // Aguarda leve delay para evitar race condition
        setTimeout(() => {
          router.replace("/auth/registerFinance");
        }, 500);

      } catch (e) {
        console.error("Erro ao salvar dados do usuário Google:", e);
        mostrarToast("Erro ao salvar dados do Google", "erro");
      } finally {
        setGoogleLoginSuccess(false);
      }
    }
  }
  saveGoogleUser();
}, [user, googleLoginSuccess]);

  async function onGoogleSignin() {
    try {
      const oAuthFlow = await googleOAuth.startOAuthFlow();
      if (oAuthFlow.authSessionResult?.type === "success" && oAuthFlow.setActive) {
        await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
        setGoogleLoginSuccess(true);
      }
    } catch (error) {
      console.log("Erro no Google OAuth:", error);
    }
  }

  async function handleLogin() {
    // Limpar erros antes de tentar login
    setEmailError('');
    setSenhaError('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.LOGIN}`, { email, senha });

      // salvando os dados e navegando
      const userName = response.data.usuario.nome;
      const userId = response.data.usuario.id;
      const renda = response.data.usuario.renda;

      const prevEmail = await AsyncStorage.getItem('email');
      if (prevEmail && prevEmail !== email) {
        await AsyncStorage.removeItem('fotoPerfil');
      }

      await AsyncStorage.setItem('userName', userName);
      await AsyncStorage.setItem('userId', userId.toString());
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('email', email);

      if (renda != null) {
        await AsyncStorage.setItem('renda', renda.toString());
      } else {
        await AsyncStorage.removeItem('renda');
        router.replace("/auth/registerFinance");
        setIsLoading(false);
        return;
      }

      router.replace('/pages/userDash');
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);

      if (error.response?.status === 401) {
        setEmailError('E-mail ou senha inválidos');
        setSenhaError('');
        setTimeout(() => {
          setEmailError('');
        }, 5000);
      } else if (error.message === 'Network Error') {
        mostrarToast('Erro de conexão. Verifique sua internet.', 'erro');
      } else {
        mostrarToast('Erro inesperado ao tentar login.', 'erro');
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

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
          error={emailError}  // aqui passa o erro
        />
        <Input
          placeholder="Senha"
          icon="lock-closed-outline"
          isPassword
          value={senha}
          onChangeText={setSenha}
          error={senhaError} // aqui passa o erro
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button title="Acessar" onPress={handleLogin} disabled={isLoading} />
      </View>

      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <Text style={styles.separatorText}>Ou faça login com</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.googleBtn} onPress={onGoogleSignin}>
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

      <ToastAlerta
        visivel={toastVisivel}
        tipo={tipo}
        mensagem={mensagem}
        aoFechar={esconderToast}
      />
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
    alignItems: "center",
  },
  buttonWrapper: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
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
    fontWeight: "500",
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
    fontWeight: "600",
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
    fontWeight: "500",
  },
});
