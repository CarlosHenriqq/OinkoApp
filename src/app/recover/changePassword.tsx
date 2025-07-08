import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../../components/botao";
import Input from "../../../components/input";


export default function ChangePassword(){
    return(
        <View style={styles.container}>
            <View style={styles.textoSenha}>
                <Text style={{ color: '#4A4A4A', fontSize: 34, fontFamily: 'Manrope', fontWeight: "bold", maxWidth: 170, textAlign: 'center', lineHeight: 40 }}>
                    Alterar sua senha</Text>
            </View>

                <View style={{marginTop: 20}}>
                    <Text style={{ color: '#4A4A4A', fontSize: 16, fontFamily: 'Manrope', fontWeight: "normal", maxWidth: 220, textAlign: 'center' }}>
                        Preenche os campos abaixo e crie uma <Text style={{fontWeight: "bold"}}>nova senha</Text></Text>
                </View>
                        <View style={{marginTop: 60}}>
                            <Input placeholder="Crie sua senha" icon="lock-closed-outline" isPassword/>
                            <Input placeholder="Repita sua senha" icon="lock-closed-outline" isPassword/>
                        </View>
                                <View style={{marginTop: 50}}>
                                    <Button title="Redefinir senha" onPress={()=>router.replace("/recover/recoverPassword")}/>
                                </View>

                                    <View style={{marginTop: 180, flexDirection:"row", gap: 5, }}>
                                            <TouchableOpacity onPress={()=>router.replace("/auth/login")}>
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
    textoSenha:{
        marginTop: 40,
    
    }
})