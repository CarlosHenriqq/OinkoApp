import axios from "axios";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import {
    Alimentacao,
    Assinaturas,
    Cartao,
    Contas,
    Cuidados,
    Divida,
    Educacao,
    Entretenimento,
    Moradia,
    Outros,
    Pets,
    Saude,
    Transporte
} from "../../../assets/iconsCategorias";
import GastoCategoriaDescricao from "../../../components/gastoCategoriaDescricao";
=======
import { useCallback, useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Alimentacao, Assinaturas, Cartao, Contas, Cuidados, Divida, Educacao, Entretenimento, Moradia, Outros, Pets, Saude, Transporte } from '../../../assets/iconsCategorias';
import GastoCategoriaRelatorio from "../../../components/gastoCategoriaRelatorio";
>>>>>>> 82205edc5a2df9e3535d49a03e63adc6c27b6cf3
import Header from "../../../components/header";
import NavegacaoMeses from "../../../components/navegacaoMeses";

const { width } = Dimensions.get("window");

export default function Relatorio() {
  const [gastos, setGastos] = useState([]);
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth()); // 0..11
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());
  const [userId, setUserId] = useState(null);

  const iconMap = {
        'Alimentação': Alimentacao,
        'Pets': Pets,
        'Dívidas': Divida,
        'Transporte': Transporte,
        'Educação': Educacao,
        'Saúde': Saude,
        'Entretenimento': Entretenimento,
        'Moradia': Moradia,
        'Contas do dia a dia': Contas,
        'Cartão de crédito': Cartao,
        'Cuidados Pessoais': Cuidados,
        'Outros': Outros,
        'Assinatura': Assinaturas
    };

<<<<<<< HEAD
  useEffect(() => {
    // Se você pegar userId do AsyncStorage ou de contexto, carregue aqui
    async function fetchUserId() {
      // Exemplo: você pode usar AsyncStorage para pegar o userId
      // import AsyncStorage e descomente a linha abaixo
      // const storedUserId = await AsyncStorage.getItem('userId');
      // setUserId(Number(storedUserId));
      
      // Para exemplo, deixo fixo:
      setUserId(23);
=======
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
>>>>>>> 82205edc5a2df9e3535d49a03e63adc6c27b6cf3
    }
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId !== null) {
      buscarGastos();
    }
  }, [mesSelecionado, anoSelecionado, userId]);

  async function buscarGastos() {
    try {
      const mesParaEnvio = mesSelecionado + 1; // mês 1..12 para backend
      const response = await axios.get(
        "http://192.168.1.110:3000/expenses/extract/extrato",
        {
          headers: { usuario_id: userId },
          params: { ano: anoSelecionado, mes: mesParaEnvio }
        }
      );
      setGastos(response.data);
    } catch (error) {
      console.log("Erro ao buscar gastos:", error);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} overScrollMode="never">
      <View style={styles.Background}>
        <Header />

        <Text style={styles.TextTop}>Relatório de gastos mensais</Text>

<<<<<<< HEAD
        <NavegacaoMeses
          mesSelecionado={mesSelecionado}
          anoSelecionado={anoSelecionado}
          setMesSelecionado={setMesSelecionado}
          setAnoSelecionado={setAnoSelecionado}
        />
=======
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
>>>>>>> 82205edc5a2df9e3535d49a03e63adc6c27b6cf3

        <View style={styles.expenseContainer}>
          <Text style={{ fontSize: 16, color: "#4A4A4A", fontFamily: "Manrope" }}>
            Nesse mês você gastou:
          </Text>
          {/* Você pode calcular o total e mostrar aqui dinamicamente */}
          <Text style={{ fontSize: 18, color: "#526471", fontFamily: "Manrope", fontWeight: "600" }}>
            R$ {gastos.reduce((total, g) => total + Number(g.valor), 0).toFixed(2).replace('.', ',')}
          </Text>
        </View>

        <View style={{ marginTop: 20, marginBottom: 10, width: "90%", alignItems: "flex-start" }}>
          <Text
            style={{
              fontFamily: "Manrope",
              fontSize: 20,
              fontWeight: "600",
              color: "#4a4a4a",
              textAlign: "left"
            }}
          >
            Resumo total dos gastos
          </Text>
        </View>

        <View style={[styles.Card, { paddingTop: 30 }]}>
          {gastos.map((gasto, index) => {
            const Imagem = iconMap[gasto.categoria_nome] || Outros;
            return (
              <GastoCategoriaDescricao
                key={index}
                data={gasto.data}
                descricao={gasto.descricao}
                valor={`R$${Number(gasto.valor).toFixed(2).replace('.', ',')}`}
                Imagem={Imagem}
              />
            );
          })}
        </View>

        <View style={{ height: 20 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: "#E0E8F9",
    alignItems: "center"
  },
  Card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    paddingTop: 60,
    height: 620,
    paddingBottom: 30,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  TextTop: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4a4a4a",
    marginTop: 50,
    fontFamily: "Manrope"
  },
  expenseContainer: {
    borderRadius: 30,
    backgroundColor: "#ffffff",
    width: 315,
    height: 50,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  }
});
