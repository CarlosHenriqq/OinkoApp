import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../../components/botao";
import Input from "../../../components/input";

export default function ForgetPassword(){
    return(
        <View style={styles.container}>
            <View style={styles.textoSenha}>
                <Text style={{ color: '#4A4A4A', fontSize: 34, fontFamily: 'Manrope', fontWeight: "bold", maxWidth: 198, textAlign: 'center', lineHeight: 40 }}>
                    Esqueceu a sua senha?</Text>
            </View>

                <View style={{marginTop: 20}}>
                    <Text style={{ color: '#4A4A4A', fontSize: 16, fontFamily: 'Manrope', fontWeight: "normal", maxWidth: 300, textAlign: 'center' }}>
                        Digite o seu e-mail no campo abaixo e lhe enviaremos um código de <Text style={{fontWeight: "bold"}}>recuperação de senha</Text></Text>
                </View>

                    <View style={{marginTop: 70}}>
                        <Input placeholder="Digite seu E-mail" icon="mail-outline"/>
                    </View>
                        <View style={{marginTop: 50}}>
                            <Button title="Continuar" onPress={()=>router.replace("/recover/recoverPassword")}/>
                        </View>

                            <View style={{marginTop: 220, flexDirection:"row", gap: 5, }}>
                                <Text style={{ color: '#4A4A4A', fontSize: 16, fontFamily: 'Manrope', fontWeight: "normal", maxWidth: 300, textAlign: 'center' }}>Já possui conta?</Text>
                                    <TouchableOpacity onPress={()=>router.replace("/auth/login")}>
                                        <Text style={{ color: '#4A4A4A', fontSize: 16, fontFamily: 'Manrope', fontWeight: "bold", textDecorationLine: "underline", maxWidth: 300, textAlign: 'center' }}>Clique aqui</Text>
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
    textoSenha:{
        marginTop: 40,
    
    }
})