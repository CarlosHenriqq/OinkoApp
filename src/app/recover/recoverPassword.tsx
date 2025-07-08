import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../../components/botao";
import InputVerication from "../../../components/inputVerication";

export default function RecoverPassword(){
    return(
        <View style={styles.container}>
            <View style={styles.textoSenha}>
                <Text style={{ color: '#4A4A4A', fontSize: 34, fontFamily: 'Manrope', fontWeight: "bold", maxWidth: 250, textAlign: 'center', lineHeight: 40 }}>
                    Recuperação de senha</Text>
            </View>

                <View style={{marginTop: 20}}>
                    <Text style={{ color: '#4A4A4A', fontSize: 16, fontFamily: 'Manrope', fontWeight: "normal", maxWidth: 300, textAlign: 'center' }}>
                        Agora, insira o código que te enviamos por e-mail para criar uma <Text style={{fontWeight: "bold"}}>nova senha</Text></Text>
                </View>

                    <View style={{marginTop: 60}}>
                        <InputVerication/>
                    </View>
                        
                        <View style={{marginTop: 10, flexDirection:"row", gap: 5, }}>
                                <TouchableOpacity>
                                    <Text style={{ color: '#4A4A4A', fontSize: 12, fontFamily: 'Manrope', fontWeight: "bold", textDecorationLine: "underline", maxWidth: 300, textAlign: 'center' }}>Reenviar código</Text>
                                </TouchableOpacity>
                        </View>           


                            <View style={{marginTop: 50}}>
                                <Button title="Continuar"onPress={()=>router.replace("/recover/changePassword")}/>
                            </View>

                                <View style={{marginTop: 220, flexDirection:"row", gap: 5, }}>
                                    <TouchableOpacity onPress={()=>router.replace("/recover/forgetPassword")}>
                                        <Text style={{ color: '#4A4A4A', fontSize: 16, fontFamily: 'Manrope', fontWeight: "bold", textDecorationLine: "underline", maxWidth: 300, textAlign: 'center' }}>Voltar para tela anterior</Text>
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