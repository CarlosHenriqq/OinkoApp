import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Google from '../../../assets/images/google.svg';
import Logo from '../../../assets/images/logo.svg';
import { Button } from "../../../components/botao";
import Input from '../../../components/input';
export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleLogin() {
        try {
            const response = await axios.post('http://192.168.1.109:3000/auth/login', {
                email,
                senha
            });
            const userName = response.data.usuario.nome;
             await AsyncStorage.setItem('userName', userName);
            console.log(response.data);
            Alert.alert('Sucesso', 'Login realizado com sucesso!');

            // salvar token no asyncstorage se for usar persistência
            await AsyncStorage.setItem('token', response.data.token);

            // redirecionar para o dashboard
            router.replace('/pages/userDash');

        } catch (error) {
         
            console.error(error);
            Alert.alert('Erro', 'Email ou senha inválidos.');
        }
    }
    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >

            
                <Logo style={{marginTop:30}} />
                <Text style={{ fontSize: 34, fontFamily: 'Manrope', fontWeight: 'bold', color: '#4A4A4A', marginTop: 40 }}>Faça seu login</Text>

                <View style={{ marginTop: 30}}>
                    <Input placeholder="E-mail" icon="mail-outline" value={email} onChangeText={setEmail} />
                    <Input placeholder="Senha" icon="lock-closed-outline" isPassword value={senha} onChangeText={setSenha} />

                </View>
                <View style={{ marginTop: 20, marginBottom:20}}>
                    <Button title="Acessar" onPress ={handleLogin} />
                </View>
                <View style={styles.separatorContainer}>
                    <View style={styles.line} />
                    <Text style={styles.separatorText}>Ou faça login com</Text>
                    <View style={styles.line} />
                </View>
                <TouchableOpacity style={{backgroundColor:'white', borderRadius:40,padding:5, marginBottom:20}}>
                    <Google />
                </TouchableOpacity>
           
                <TouchableOpacity onPress={()=>router.replace("/recover/forgetPassword")}>
                    <Text style={{ textDecorationLine: 'underline', color: '#4A4A4A', fontFamily: 'Manrope', fontSize: 16, }}>
                        Esqueceu sua senha? 
                    </Text>
                </TouchableOpacity>
                 <View style={{ marginTop:0, alignItems: 'center', flexDirection: 'row', gap: 2, marginBottom:65 }}>
                <Text style={{ color: '#4A4A4A', fontFamily: 'Manrope', fontSize: 16 }}>
                    Não possui uma conta?
                </Text>
                <TouchableOpacity onPress={()=>router.replace("/auth/register")}>
                    <Text style={{ textDecorationLine: 'underline', color: '#4A4A4A', fontFamily: 'Manrope', fontSize: 16 }}>
                        Clique aqui
                    </Text>
                </TouchableOpacity>
                </View>
          

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
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