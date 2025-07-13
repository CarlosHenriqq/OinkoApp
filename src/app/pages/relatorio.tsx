import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../../components/header";
import NavegacaoMeses from "../../../components/navegacaoMeses";
const { width } = Dimensions.get('window');


export default function Relatorio(){
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
                        
                                <View style={[styles.Card, { paddingTop: 30 }]}></View>
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


