// UserDash atualizado com useFocusEffect para atualizar o total de gastos

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { PieChart } from 'react-native-gifted-charts';
import { Alimentacao } from "../../../assets/iconsCategorias";
import Cabeca from "../../../assets/images/cabeca.svg";
import Moeda from "../../../assets/images/moeda.svg";
import { Button } from "../../../components/botao";
import GastoCategoria from "../../../components/gastoCategoria";
import Header from "../../../components/header";
import Newgasto from "../../../components/NewGasto";

const { width } = Dimensions.get('window');

export default function UserDash() {
    const [primeiroNome, setPrimeiroNome] = useState('');
    const [gasto, setGasto] = useState('0,00');
    const [popupVisible, setPopupVisible] = useState(false);
    const [renda, setRenda] = useState('');

    async function buscarGasto() {
        const userId = await AsyncStorage.getItem('userId');
        console.log('UserDash buscando gasto para userId:', userId);
        try {
            const response = await axios.get('http://192.168.1.107:3000/expenses/gastos/total', {
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

    useEffect(() => {
        async function carregarNome() {
            const nomeCompleto = await AsyncStorage.getItem('userName');
            if (nomeCompleto) {
                const primeiro = nomeCompleto.split(' ')[0];
                setPrimeiroNome(primeiro);
            }
        }
        async function buscarUserInfo() {
            const userId = await AsyncStorage.getItem('userId');

            try {
                const response = await axios.get('http://192.168.1.107:3000/auth/userInfo', {
                    headers: { usuario_id: userId }
                });
                console.log(response.data); // contém id, nome, email, renda
                setRenda(response.data.renda)
            } catch (error) {
                console.error('Erro ao buscar user info:', error);
            }
        }

        buscarUserInfo();
        carregarNome();
        buscarGasto();
    }, []);

    useFocusEffect(
        useCallback(() => {
            buscarGasto();
        }, [])
    );

    async function handleSalvarGasto(gastoSalvo) {
        console.log('Gasto salvo no backend:', gastoSalvo);
        setTimeout(() => {
            buscarGasto();
        }, 500);
    }

    async function handleLogout() {
        try {
            await AsyncStorage.removeItem('token');
            router.replace('/auth/login');
        } catch (error) {
            console.error(error);
            alert('Erro ao fazer logout.');
        }
    }

    const gastosFicticios = [
        { value: 325, color: '#B65C5C', focused: true },
        { value: 195, color: '#5C7F8A', focused: false },
        { value: 65, color: '#C8AD94', focused: false },
        { value: 260, color: '#6DA97A', focused: false },
        { value: 0, color: '#AAAAAA', text: 'Outros' },
    ];

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
                    <Text style={styles.expenseValue}>R${gasto}</Text>
                </View>
                <Moeda />
            </View>

            <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Button title='Registrar Gasto' onPress={() => setPopupVisible(true)} />
            </View>
            <Button title="Sair" onPress={handleLogout} />

            <View style={{ marginTop: 20, marginLeft: 20 }}>
                <Text style={{ fontFamily: 'manrope', fontSize: 20, fontWeight: '600', color: '#4a4a4a' }}>
                    Gastos atuais por categoria
                </Text>
            </View>

            <View style={styles.gastosCard}>
                <PieChart
                    data={gastosFicticios}
                    donut
                    showText
                    textColor="white"
                    radius={150}
                    innerRadius={90}
                    sectionAutoFocus={false}
                    centerLabelComponent={() => (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 22, fontFamily: 'Manrope', fontWeight: 'bold' }}>Total</Text>
                            <Text style={{ fontSize: 18, fontFamily: 'Manrope' }}>R${renda}</Text>
                        </View>
                    )}
                />

                <View style={{ marginTop: 30 }}>
                    <GastoCategoria
                        titulo="Dívidas"
                        subtitulo="Total da categoria"
                        valor="R$325,00"
                        Imagem={Alimentacao}
                    />
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
