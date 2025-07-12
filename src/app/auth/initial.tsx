import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Oinko from '../../../assets/images/oinko.svg';
import { Button } from "../../../components/botao";
export default function Initial() {

    const router = useRouter();

    function handlePressLogin(){
        router.push('/auth/login');

    }
    return (
        <View style={styles.Background}>
        <View style={styles.container}>
            <Text style={{ fontFamily: 'Manrope', fontSize: 34, color: '#4A4A4A', fontWeight: 'bold', textAlign: 'center', maxWidth: '80%', marginBottom:40, marginTop:28, lineHeight: 35 }}>O controle da sua
                <Text style={{ fontWeight: '800', textAlign: 'justify' }}> grana </Text>começa aqui</Text>

            <Oinko width={293.95} height={450.61} style={{ marginBottom: 50 }} />
            <View>
                <Button title='Login' onPress={handlePressLogin}/>
            </View>
            <View style={{ marginTop:15 , alignItems: 'center', flexDirection: 'row', gap: 2, marginBottom:40 }}>
                <Text style={{ color: '#4A4A4A', fontFamily: 'Manrope', fontSize: 16 }}>
                    Não possui uma conta?
                </Text>
                <TouchableOpacity onPress={() => router.push('/auth/register')}>
                    <Text style={{ textDecorationLine: 'underline', color: '#4A4A4A', fontFamily: 'Manrope', fontSize: 16 }}>
                        Clique aqui
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
        </View>
    )
}
const styles = StyleSheet.create({

    container: {
        
        backgroundColor: '#E0E8F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 65,  
        
    },
    image: {
        width: 293.95,
        height: 430,
        marginBottom: 60

    },
    Background: {
        flex:1,
        backgroundColor:'#E0E8F9',
    }
});
