import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Alimentacao, Assinaturas, Cartao, Contas, Cuidados, Divida, Educacao, Entretenimento, Moradia, Outros, Pets, Saude, Transporte } from '../../../assets/iconsCategorias';
import GastoCategoriaRelatorio from "../../../components/gastoCategoriaRelatorio";
import Header from "../../../components/header";
import NavegacaoMeses from "../../../components/navegacaoMeses";
const { width } = Dimensions.get('window');


export default function Relatorio(){

      const [gastos, setGastos] = useState([]);

    const iconMap = {
    'Alimentação': Alimentacao,
    'Pets': Pets,
    'Dívidas': Divida,
    'Transporte': Transporte,
    'Educação': Educacao,
    'Saúde': Saude,
    'Entretenimento': Entretenimento,
    'Moradia': Moradia,
    'Contas': Contas,
    'Cartão de crédito': Cartao,
    'Cuidados Pessoais': Cuidados,
    'Outros': Outros,
    'Assinatura': Assinaturas
};


  

async function extract (){
    try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
            const response = await axios.get('http://192.168.1.110:3000/expenses/extract/extrato', {
                headers: { usuario_id: userId }
            });
            setGastos(response.data); // agora armazena o array completo
        }
    } catch (error) {
        console.log(error);
    }
}

useEffect(() => {
    extract();
}, []);
useFocusEffect(
        useCallback(() => {
            extract();
        }, [])
    );
        
    

return(

    <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    bounces={false}
    overScrollMode="never">

            <View style={styles.Background}>
                <Header/>
                    <View>
                        <Text style={styles.TextTop}>Relatório de gastos mensais</Text>
                    </View>

                        <NavegacaoMeses></NavegacaoMeses>

                        <View style={styles.expenseContainer}>
                            <Text style={{fontSize:16, color: '#4A4A4A', fontFamily: 'Manrope'}}>Nesse mês você gastou:</Text>
                            <Text style={{fontSize:18, color: '#526471', fontFamily: 'Manrope', fontWeight: 600,}}>R$845,99</Text>  
                        </View>
                        <View
                                style={{ marginTop: 20, marginBottom: 10, width: "90%", alignItems: "flex-start" }}>
                                <Text
                                    style={{
                                    fontFamily: "manrope",
                                    fontSize: 20,
                                    fontWeight: "600",
                                    color: "#4a4a4a",
                                    textAlign: "left",
                                    }}
                                >Resumo total dos gastos</Text>
                                </View>
                        
                                <View style={[styles.Card, { paddingTop: 30 }]}>

                        <GastoCategoriaRelatorio
                            titulo="Dívidas"
                            subtituloFechado="Clique para ver os gastos"
                            subtituloAberto="Clique para fechar os gastos"
                            valor="R$325,00"
                            Imagem={Divida}
                            subgastos={[
                                { nome: 'Parcela empréstimo da will carro batido ', valor: 'R$130,00', data: '03/07/2025' },
                                { nome: 'Empréstimo consignado', valor: 'R$90,00', data: '05/07/2025' },
                                { nome: 'Carnê loja casas bahia', valor: 'R$70,00', data: '10/07/2025' },
                                { nome: 'Juros cheque especial santander', valor: 'R$35,00', data: '12/07/2025' },
                            ]}
                            />

                                </View>
                    <View style={{ height: 20 }}></View>
                </View>
        </ScrollView>
    )}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: '#E0E8F9',
    alignItems: 'center',
  },

  Card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    paddingTop: 60,
    height: 620,
    paddingBottom: 30,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
  },

  Label: {
    fontSize: 20,
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    marginBottom: 1,
    fontWeight: 'bold',
  },
  TextTop: {
    fontSize: 20,
    fontWeight: "600",
    color: '#4a4a4a',
    marginTop: 50,
    fontFamily: 'Manrope'
    },

    expenseContainer: {
        borderRadius: 30,
        backgroundColor: '#ffffff',
        width:315,
        height: 50,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
    },
});


