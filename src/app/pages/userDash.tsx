import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
import { useCallback, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { PieChart } from 'react-native-gifted-charts';
import { Alimentacao, Assinaturas, Contas, Cuidados, Divida, Educacao, Entretenimento, Outros, Pets, Saude, Transporte } from '../../../assets/iconsCategorias';
import Cabeca from "../../../assets/images/cabeca.svg";
import Moeda from "../../../assets/images/moeda.svg";
import { Button } from "../../../components/botao";
import GastoCategoria from "../../../components/gastoCategoria";
import Header from "../../../components/header";
import Newgasto from "../../../components/NewGasto";
import { API_BASE_URL, ENDPOINTS } from "../../config/api";

const { width } = Dimensions.get('window');

export default function UserDash() {
  const [primeiroNome, setPrimeiroNome] = useState('');
  const [gasto, setGasto] = useState('0,00');
  const [popupVisible, setPopupVisible] = useState(false);
  const [renda, setRenda] = useState('');
  const [gastosPorCategoria, setGastosPorCategoria] = useState([]);




  const iconMap = {
    'Alimentação': Alimentacao,
    'Pets': Pets,
    'Dívidas': Divida,
    'Transporte': Transporte,
    'Educação': Educacao,
    'Saúde': Saude,
    'Entretenimento': Entretenimento,
    'Contas do dia a dia': Contas,
    'Cuidados Pessoais': Cuidados,
    'Outros': Outros,
    'Assinatura': Assinaturas
  };

  function alteraCor() {
    const rendaNum = parseFloat(
      typeof renda === 'string' ? renda.replace(',', '.') : renda ?? 0
    );
    const gastoNum = parseFloat(
      typeof gasto === 'string' ? gasto.replace(',', '.') : gasto ?? 0
    );
    return rendaNum < gastoNum ? 'red' : '#526471';
  }
  async function buscarGasto() {
    const userId = await AsyncStorage.getItem('userId');
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.GASTOS}/total`, {
        headers: { usuario_id: userId }
      });
      if (response.data?.total != null) {
        const valorFormatado = Number(response.data.total).toFixed(2).replace('.', ',');
        setGasto(valorFormatado);

      } else {
        setGasto('0,00');
      }
    } catch (error) {
      console.error('Erro ao buscar gastos:', error);
    }
  }
  async function buscarGastosPorCategoria() {
    const userId = await AsyncStorage.getItem('userId');
    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.GASTOS}/totalPCategoria`, {
        headers: { usuario_id: userId }
      });
      setGastosPorCategoria(response.data);
    } catch (error) {
      console.error('Erro ao buscar gastos por categoria:', error);
    }
  }
  async function buscarUserInfo() {
    const userId = await AsyncStorage.getItem('userId');

    try {
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.USER_INFO}`, {
        headers: { usuario_id: userId }
      });
      console.log(response.data); // contém id, nome, email, renda
      setRenda(response.data.renda)
      const nomeCompleto = response.data.nome
       if (nomeCompleto) {
      const primeiro = nomeCompleto.split(' ')[0];
      setPrimeiroNome(primeiro);
    }
    } catch (error) {
      console.error('Erro ao buscar user info:', error);
    }
  }
  
  useEffect(() => {
    buscarUserInfo();
    buscarGasto();
    buscarGastosPorCategoria();
  }, []);

  useFocusEffect(
    useCallback(() => {
      buscarGasto();
      buscarGastosPorCategoria();
      buscarUserInfo();
    }, [])
  );

  async function handleSalvarGasto(gastoSalvo) {
    console.log('Gasto salvo no backend:', gastoSalvo);
    setTimeout(() => {
      buscarGasto();
      buscarGastosPorCategoria();
    }, 100);
  }

  const categoriaCores = {
    'Dívidas': '#B65C5C',
    'Transporte': '#5C7F8A',
    'Pets': '#C8AD94',
    'Saúde': '#6DA97A',
    'Cuidados Pessoais': '#B9A7C3',
    'Educação': '#708BD8',
    'Entretenimento': '#F1997C',
    'Assinatura': '#8A38F5',
    'Alimentação': '#E6C48C',
    'Contas do Dia a Dia': '#6F6F6F',
    'Outros': '#D6D0C4',
  };
  const rendaNum = parseFloat(typeof renda === 'string' ? renda.replace(',', '.') : renda ?? 0);
  const gastoNum = parseFloat(typeof gasto === 'string' ? gasto.replace(',', '.') : gasto ?? 0);
  const rendaRestante = Math.max(rendaNum - gastoNum, 0);
  const dadosGrafico =
  gastosPorCategoria.length > 0
    ? gastosPorCategoria.map((gasto) => ({
        value: parseFloat(gasto.total),
        color: categoriaCores[gasto.nome],
        text: gasto.nome,
      }))
    : [
        {
          value: rendaNum,
          color: '#a8a8a8ff',
          text: 'Disponível',
        },
      ];

// Adiciona a fatia da renda restante caso existam gastos
if (gastosPorCategoria.length > 0 && rendaNum > 0) {
  dadosGrafico.push({
    value: rendaRestante,
    color: '#a8a8a8ff',
    text: 'Disponível',
  });
}

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} overScrollMode="never">
      <Header />
      <View style={{ alignItems: 'center', marginTop: 35 }}>
        <View style={styles.greetingContainer}>
          <Cabeca />
          <View style={{ marginTop: 25 }}>
            <Text style={styles.greetingText}>Como vai você,</Text>
            <Text style={styles.userNameText}>{primeiroNome}?</Text>
          </View>
        </View>
      </View>

      <View style={styles.expenseContainer}>
        <View>
          <Text style={styles.expenseLabel}>Você gastou:</Text>
          <Text style={[styles.expenseValue, { color: alteraCor() }]}>R${gasto}</Text>
        </View>
        <Moeda />
      </View>

      <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Button title='Registrar Gasto' onPress={() => setPopupVisible(true)} />
      </View>

      <View style={{ marginTop: 20, marginLeft: 20 }}>
        <Text style={{ fontFamily: 'Manrope', fontSize: 20, fontWeight: '600', color: '#4a4a4a' }}>
          Gastos atuais por categoria
        </Text>
      </View>

      <View style={styles.gastosCard}>
        <PieChart
          data={dadosGrafico}
          donut

          textColor="white"
          radius={150}
          innerRadius={90}
          sectionAutoFocus={false}
          centerLabelComponent={() => (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 22, fontFamily: 'Manrope', fontWeight: 'normal' , color:'#4a4a4a', textAlign: "center", lineHeight: 23,}}>Renda{'\n'}total</Text>
              <Text style={{ fontSize: 20, fontFamily: 'Manrope', fontWeight: 'semibold', color:'#4a4a4a', paddingTop: 5, }}>R${renda}</Text>
            </View>
          )}
        />


        <View style={{ marginTop: 30 }}>
          {gastosPorCategoria.map((gasto, index) => {
            const Imagem = iconMap[gasto.nome] || Outros; // Usa ícone 'Outros' como fallback
            return (
              <GastoCategoria
                key={index}
                titulo={gasto.nome}
                subtitulo="Total da categoria"
                valor={`R$${Number(gasto.total).toFixed(2).replace('.', ',')}`}
                Imagem={Imagem}
              />
            );
          })}
        </View>
      </View>

      <Newgasto
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        onSave={handleSalvarGasto}
      />
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    marginTop: -8,
    marginBottom: 16,
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
    flexDirection: 'row',
    gap: 108,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    
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
    color: '#526471',
  },
  gastosCard: {
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
    elevation: 3,
  },
});