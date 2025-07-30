import { useOAuth } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Google from '../../assets/images/google.svg';
import Logo from '../../assets/images/logo.svg';
import { Button } from "../../components/botao";
import Input from '../../components/input';
import ToastAlerta from "../../components/toast";
import { API_BASE_URL, ENDPOINTS } from "../config/api";

WebBrowser.maybeCompleteAuthSession()

export default function Login() {

    const [toastVisivel, setToastVisivel] = useState(true);
    const [tipo, setTipo] = useState<'sucesso' | 'erro'>('sucesso');
    const [mensagem, setMensagem] = useState('');

    function mostrarToast(texto: string, tipoAlerta: 'sucesso' | 'erro') {
        setMensagem(texto);
        setTipo(tipoAlerta);
        setToastVisivel(true);
    }

    function esconderToast() {
        setToastVisivel(false);
    }

    const [isLoading, setIsLoading] = useState(false);
    const googleOAuth = useOAuth({ strategy: "oauth_google" })

    async function onGoogleSignin() {
        console.log('chamou')
        try {
            const oAuthFlow = await googleOAuth.startOAuthFlow()

            if (oAuthFlow.authSessionResult?.type === "success") {
                if (oAuthFlow.setActive) {
                    await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId })
                }
            } else {
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        WebBrowser.warmUpAsync()

        return () => {
            WebBrowser.coolDownAsync()
        }
    }, [])
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleLogin() {
    try {
        const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.LOGIN}`, { email, senha });

        const userName = response.data.usuario.nome;
        const userId = response.data.usuario.id;
        const renda = response.data.usuario.renda;

        await AsyncStorage.setItem('userName', userName);
        await AsyncStorage.setItem('userId', userId.toString());
        await AsyncStorage.setItem('token', response.data.token);

        if (renda != null) {
            await AsyncStorage.setItem('renda', renda.toString());
        } else {
            await AsyncStorage.removeItem('renda');
        }

        router.replace('/pages/userDash');
    } catch (error: any) {
        console.error('Erro ao fazer login:', error);

        // Evita mostrar erro técnico no toast
        if (error.response?.status === 401) {
            mostrarToast('E-mail ou senha inválidos.', 'erro');
        } else if (error.message === 'Network Error') {
            mostrarToast('Erro de conexão. Verifique sua internet.', 'erro');
        } else {
            mostrarToast('Erro inesperado ao tentar login.', 'erro');
        }
    }
}


    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >


            <Logo width={280} style={{ marginTop: 60 }} />
            <Text style={{ fontSize: 34, fontFamily: 'Manrope', fontWeight: 'bold', color: '#4A4A4A', marginTop: 10 }}>Faça seu login</Text>

            <View style={{ marginTop: 30 }}>
                <Input placeholder="E-mail" icon="mail-outline" value={email} onChangeText={setEmail} error="" />
                <Input placeholder="Senha" icon="lock-closed-outline" isPassword value={senha} onChangeText={setSenha} error="" />

            </View>
            <View style={{ marginTop: 20, marginBottom: 20 }}>
                <Button title="Acessar" onPress={handleLogin} />
                <Button title="aaa" onPress={onGoogleSignin} />
            </View>
            <View style={styles.separatorContainer}>
                <View style={styles.line} />
                <Text style={styles.separatorText}>Ou faça login coma</Text>
                <View style={styles.line} />
            </View>
            <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 40, padding: 5, marginBottom: 20 }} onPress={() => console.log('clicado')}>
                <Google />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace("/recover/forgetPassword")}>
                <Text style={{ textDecorationLine: 'underline', color: '#4A4A4A', fontFamily: 'Manrope', fontSize: 16, }}>
                    Esqueceu sua senha?
                </Text>
            </TouchableOpacity>
            <View style={{ marginTop: 0, alignItems: 'center', flexDirection: 'row', gap: 2, marginBottom: 65 }}>
                <Text style={{ color: '#4A4A4A', fontFamily: 'Manrope', fontSize: 16 }}>
                    Não possui uma conta?
                </Text>
                <TouchableOpacity onPress={() => router.replace("/auth/register")}>
                    <Text style={{ textDecorationLine: 'underline', color: '#4A4A4A', fontFamily: 'Manrope', fontSize: 16 }}>
                        Clique aqui
                    </Text>
                </TouchableOpacity>
            </View>
            <ToastAlerta
                visivel={true}
                tipo={tipo}
                mensagem={mensagem}
                aoFechar={esconderToast}
            />


        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0E8F9',
        justifyContent: 'center',
        alignItems: 'center',

    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {

        height: 1,
        backgroundColor: '#4A4A4A',
        width: 70
    },
    separatorText: {
        marginHorizontal: 10,
        fontFamily: 'Manrope',
        fontSize: 16,
        color: '#4A4A4A',
    },

})