import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { PieChart } from 'react-native-gifted-charts';
import Cabeca from "../../../assets/images/cabeca.svg";
import Moeda from "../../../assets/images/moeda.svg";
import { Button } from "../../../components/botao";
import Header from "../../../components/header";


const { width } = Dimensions.get('window');

export default function UserDash() {
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
                            Carlos?
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.expenseContainer}>
                <View>
                <Text style={styles.expenseLabel}>Você gastou:</Text>
                <Text style={styles.expenseValue}>R$845,00</Text>
                </View>
                <View>
                    <Moeda />
                </View>
            </View>

            <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Button title='Registrar Gasto' />
            </View>
            <View style={{marginTop:20, marginLeft:25}}>
                <Text style={{fontFamily:'manrope', fontSize:20, fontWeight:'600', color:'#4a4a4a'}}> Gastos atuais por categoria</Text>
            </View>
            <View style={{
    marginTop: 10,
    marginLeft: 25,
    backgroundColor: '#ffffff',
    width: 362,
    height: 922,
    borderRadius: 20,
    
    alignItems: 'center',
    padding: 20,
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
                <View style={{ alignItems: 'center' }}>
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
