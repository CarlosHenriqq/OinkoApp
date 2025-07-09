import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { PieChart } from 'react-native-gifted-charts';
import Cabeca from "../../../assets/images/cabeca.svg";
import Moeda from "../../../assets/images/moeda.svg";
import { Button } from "../../../components/botao";
import Header from "../../../components/header";

const { width } = Dimensions.get('window');



export default function UserDash() {
    const [primeiroNome, setPrimeiroNome] = useState('');
    const [gasto, setGasto] = useState(0)
    useEffect(() => {
        async function carregarNome() {
            const nomeCompleto = await AsyncStorage.getItem('userName');
            if (nomeCompleto) {
                // Pega apenas o primeiro nome:
                const primeiro = nomeCompleto.split(' ')[0];
                setPrimeiroNome(primeiro);
            }
        }
        carregarNome();

async function buscarGasto() {
    const userId = await AsyncStorage.getItem('userId');
    try {
        const response = await axios.get('http://192.168.1.109:3000/expenses/gastos/total',{
            headers:{
                usuario_id: userId
            }
        });
        setGasto(response.data.total);
        console.log(response.data.total)
       
    } catch (error) {
        console.error(error);
    }
}   
buscarGasto()

    }, []);
    const gastosFicticios = [
    {value: 325, color: '#B65C5C',focused:true,},
    {value: 195, color: '#5C7F8A',focused:false,},
    {value: 65, color: '#C8AD94',focused:false, },
    {value: 260, color: '#6DA97A',focused:false, },
    {value: 0, color: '#AAAAAA', text: 'Outros'}, // exemplo valor zero para teste
];




    return (
        <ScrollView style={styles.container}>
            <Header />
            <View style={{ alignItems: 'center', marginTop: 35 }}>
                <View style={styles.greetingContainer}>
                    <Cabeca />
                    <View style={{ marginTop: 25 }}>
                        <Text style={styles.greetingText}>
                            Como vai você,
                        </Text>
                        <Text style={styles.userNameText}>
                            {primeiroNome}?
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.expenseContainer}>
                <View>
                <Text style={styles.expenseLabel}>Você gastou:</Text>
                <Text style={styles.expenseValue}>R${gasto}</Text>
                </View>
                <View>
                    <Moeda />
                </View>
            </View>

            <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Button title='Registrar Gasto' onPress={{}}/>
            </View>
            <View style={{marginTop:20, marginLeft:20}}>
                <Text style={{fontFamily:'manrope', fontSize:20, fontWeight:'600', color:'#4a4a4a'}}> Gastos atuais por categoria</Text>
            </View>
            <View style={{
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: '90%',
    height: 922,
    borderRadius: 20,
    alignSelf: 'center',
    padding: 20,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.1,
            shadowRadius: 3, 
}}>
    <PieChart 
        data={gastosFicticios}
        donut
        showText
        textColor="white"
        radius={150}
        innerRadius={90}
        sectionAutoFocus={false}
        centerLabelComponent={() => {
            const total = gastosFicticios.reduce((sum, item) => sum + item.value, 0);
            return (
                <View style={{ alignItems: 'center'}}>
                    <Text style={{ fontSize: 22, fontFamily: 'Manrope', fontWeight: 'bold' }}>
                        Total
                    </Text>
                    <Text style={{ fontSize: 18, fontFamily: 'Manrope' }}>
                        R$1300,00
                    </Text>
                </View>
            );
        }}
    />
    <View style={{marginTop: 30}}>
        
    
        </View>
</View>


        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0E8F9',
    },
    greetingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,

        marginBottom: 20,
    },

    greetingText: {
        fontFamily: 'Manrope',
        fontSize: 18,
        color: '#4a4a4a',
    },
    userNameText: {
        fontFamily: 'Manrope',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4a4a4a',
        marginTop: -8, // reduz espaço entre linhas
        marginBottom: 16, // aumenta espaço antes do card de gastos
    },
    expenseContainer: {
        borderRadius: 30,
        backgroundColor: '#ffffff',
        width: width * 0.8,
        height: 60,
        justifyContent: 'center',
        paddingHorizontal: 35,
        marginLeft: 40,
        marginTop: -25,
        flexDirection:'row',
gap:108,
alignItems:'center'
    },
    expenseLabel: {
        fontFamily: 'Manrope',
        fontSize: 14,
        color: '#4a4a4a',
    },
    expenseValue: {
        fontFamily: 'Manrope',
        fontSize: 18,
        fontWeight: '600',
        color: '#4a4a4a',
    },
});
