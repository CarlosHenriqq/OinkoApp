import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "../../../components/botao";
import { ButtonMenor } from "../../../components/botaoMenor";
import HeaderProfile from "../../../components/headerProfile";
import Input from "../../../components/input";


export default function profile(){

    
    return(
        <View style={styles.Background}>

            <HeaderProfile/>
                <View style={styles.PhotoContainer}>
                    <Image source={{ uri: 'https://media-gru2-1.cdn.whatsapp.net/v/t61.24694-24/487493204_1226577862439581_6063975574272192493_n.jpg?ccb=11-4&oh=01_Q5Aa1wFy-tCiXLpgO2Dmhi_4oEJnYi8Lwj_OVNdmwWTsU719uA&oe=687A7C45&_nc_sid=5e03e0&_nc_cat=104' }} 
                    style={styles.Photo}/>
                </View>

                <View style={styles.Card}>
            
                    <Text style={styles.Label}>Informações pessoais</Text>
                    <Text style={styles.Name}>Carlos Henrique</Text>
                    <Text style={styles.Mail}>carloslindo@gmail.com</Text>

                        <ButtonMenor title="Editar" icon="create-outline" />
                </View>

                            <View style={{ marginTop: 20, marginBottom:10, width: '90%', alignItems: 'flex-start' }}>
                                <Text style={{
                                    fontFamily: 'manrope',
                                    fontSize: 20,
                                    fontWeight: '600',
                                    color: '#4a4a4a',
                                    textAlign: 'left'
                                }}>Informações financeiras</Text>
                            </View>

                                    <View style={[styles.Card, { paddingTop: 30 }]}>
                                         <Text style={[styles.TextProfile]}>Deseja mudar sua <Text style={{fontWeight: "bold"}}>renda?</Text></Text>

                                            <Input placeholder="R$1300,00" icon="cash-outline"></Input>

                                                <Text style={[styles.TextProfile]}>Deseja mudar suas categorias?<Text style={{fontWeight: "bold"}}>Selecione até 7</Text></Text>

                                                    <Button title='Salvar alterações' onPress={()=>router.replace("/profile/profile")}/>

                                                    
                                                
                                    </View>

        </View>

               
                    
    )}

const styles = StyleSheet.create({
    Background: {
        flex: 1,
        backgroundColor: '#E0E8F9',
        alignItems: 'center',
        paddingTop: 135, // espaço pra foto
        
    },

    PhotoContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FACFBC',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
        position: 'absolute',
        top: 65, // ajusta para onde a foto deve aparecer (ajuste fino conforme o Header)
        zIndex: 2,
    },

    Photo: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    Card: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        paddingTop: 60, // espaço interno para não cobrir a foto
        paddingBottom: 30,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.1,
            shadowRadius: 3, 
    },
    Label: {
        fontSize: 20,
        color: '#4A4A4A',
        fontFamily: 'Manrope',
        marginBottom: 1,
        fontWeight: "bold"
    },
    Name: {   
        fontSize: 34,
        fontWeight: 'bold',
        color: '#4A4A4A',
        fontFamily: 'Manrope',
        marginBottom:-4,
    },

    Mail: {
        fontSize: 16,
        color: '#4A4A4A',
        fontFamily: 'Manrope',
        marginBottom: 10,
    },

    TextProfile: {
        fontSize: 20,
        color: '#4A4A4A',
        fontFamily: 'Manrope',
        marginBottom: 15,
        lineHeight: 25,
        textAlign:"center",
    },
    
})