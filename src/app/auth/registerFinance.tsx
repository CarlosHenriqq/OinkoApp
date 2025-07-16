import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StepIndicator from 'react-native-step-indicator';
import { Button } from "../../../components/botao";
import Input from "../../../components/input";
import InputCategoria from "../../../components/inputCategoria";

export default function RegisterFinance() {
    const labels = ["Dados pessoais", "Dados Financeiros"];
    const customStyles = {
        stepIndicatorSize: 20,
        currentStepIndicatorSize: 24,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#A3C0AC',
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: '#A3C0AC',
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: '#A3C0AC',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#A3C0AC',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#A3C0AC',
        stepIndicatorLabelFontSize: 12,
        currentStepIndicatorLabelFontSize: 12,
        stepIndicatorLabelCurrentColor: '#ffffff',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: '#A3C0AC'    
    };

    const categorias = [
        ["Dívidas", "Transporte", "Pets"],
        ["Saúde", "Cuidados Pessoais"],
        ["Educação", "Entretenimento"],
        ["Assinatura", "Alimentação"],
        ["Moradia", "Cartão de crédito"],
        ["Contas do dia a dia", "Outros"],
    ];

    const categoriasWidth = {
        "Dívidas": 93,
        "Transporte": 126,
        "Pets": 68,
        "Saúde": 84,
        "Cuidados Pessoais": 197,
        "Educação": 114,
        "Entretenimento": 170,
        "Assinatura": 135,
        "Alimentação": 141,
        "Moradia": 100,
        "Cartão de crédito": 188,
        "Contas do dia a dia": 200,
        "Outros": 89,
    };

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    

    function formatCurrency(value: string) {
        const cleanValue = value.replace(/\D/g, '');
        const number = parseFloat(cleanValue) / 100;
        if (isNaN(number)) return '';
        return number.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    function handleChangeRenda(text: string) {
        setRenda(formatCurrency(text));
    }

    function handleToggleCategory(category: string) {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(prev => prev.filter(c => c !== category));
        } else {
            if (selectedCategories.length < 7) {
                setSelectedCategories(prev => [...prev, category]);
            }
        }
    }
    const [renda, setRenda] = useState('');


    async function handleRegisterFinance() {
    const userIdStr = await AsyncStorage.getItem('userId');
    const userId = userIdStr ? Number(userIdStr) : null; // se for número
    try {
        const response = await axios.post('http://192.168.1.110:3000/auth/registerFinance', {
    usuario_id: userId,
    renda,
    categorias: selectedCategories
});

        console.log(response.data);
        const rendaUser = response.data.renda
         AsyncStorage.setItem('renda',rendaUser)
        alert('Informações gravadas com sucesso!');
        router.push('/auth/login');
    } catch (error) {
        console.error(error);
        alert('Erro ao salvar informações. Tente novamente.');
    }
}


    return (
        <View style={{ backgroundColor: '#E0E8F9', flex: 1 }}>
            <View style={{ backgroundColor: '#E0E8F9', marginTop: 60 }} >
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={1}
                    labels={["Dados pessoais", "Dados financeiros"]}
                    stepCount={2}
                />
                   </View>
                <View style={styles.container}>
                    <View style={{ marginBottom: 25, marginTop:24}} >
                        <Text style={{ color: '#4A4A4A', fontSize: 34, fontFamily: 'Manrope', fontWeight: "bold", maxWidth: 230, textAlign: 'center' }}>Informações Financeiras</Text>
                    </View>
                    <View>
                        <Input placeholder="Quanto é a sua renda?" icon="cash-outline" value={renda} onChangeText={setRenda} />
                    </View>
                    <View style={{ marginBottom: 25 }}>
                        <Text style={{ color: '#4A4A4A', fontSize: 20, fontFamily: 'Manrope', fontWeight: "600", maxWidth: 336, textAlign: 'center' }}>Quais dessas categorias fazem parte do seu mês? <Text style={{ fontWeight: 'bold' }}>Escolha até 7   </Text></Text>
                    </View>
                    <View style={{ paddingBottom: 20 }}>
                            {categorias.map((row, idx) => (
                                <View
                                    key={idx}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        gap: 13,

                                    }}

                                >
                                    {row.map((cat) => (
                                        <InputCategoria
                                            key={cat}
                                            title={cat}
                                            width={categoriasWidth[cat]}
                                            isSelected={selectedCategories.includes(cat)}
                                            onPress={() => handleToggleCategory(cat)}
                                            backgroundColorSelect='#A3C0AC'
                                            backgroundColorUnSelect='#ffff'
                                            borderColorSelect='#A3C0AC'
                                            borderColorUnSelect='#A3C0AC'
                                            textUnselect='#A3C0AC'
                                        />
                                    ))}
                                </View>
                            ))}
                        </View>
                        <View style={{ marginTop:25, marginBottom:25}}>
                    <Button title='Finalizar' onPress={handleRegisterFinance} />
                    </View>
            </View>

            <TouchableOpacity onPress={() => router.push('/auth/register')}>
                <Text style={{
                    textAlign: 'center',
                    fontFamily: 'manrope',
                    textDecorationLine: 'underline',
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#4a4a4a'
                }}>
                    Voltar para a tela anterior
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E0E8F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
