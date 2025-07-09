import Checkbox from 'expo-checkbox';
import { router } from 'expo-router';
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StepIndicator from 'react-native-step-indicator';
import { Button } from '../../../components/botao';
import Input from "../../../components/input";

export default function Register() {
    const label = ["Dados pessoais", "Dados Financeiros"];
    const customStyles = {
        stepIndicatorSize: 20,
        currentStepIndicatorSize: 24,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#A3C0AC',
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: '#A3C0AC',
        stepStrokeUnFinishedColor: '#4a4a4a',
        separatorFinishedColor: '#A3C0AC',
        separatorUnFinishedColor: '#4a4a4a',
        stepIndicatorFinishedColor: '#A3C0AC',
        stepIndicatorUnFinishedColor: '#4a4a4a',
        stepIndicatorCurrentColor: '#A3C0AC',
        stepIndicatorLabelFontSize: 12,
        currentStepIndicatorLabelFontSize: 12,
        stepIndicatorLabelCurrentColor: '#ffffff',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#ffffff',
        labelColor: '#4a4a4a',
        labelSize: 13,
        currentStepLabelColor: '#A3C0AC'
    };

    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Função para formatar a data no formato dd/mm/yyyy
    function formatDate(text: string) {
        let cleanText = text.replace(/\D/g, '');
        if (cleanText.length > 8) cleanText = cleanText.slice(0, 8);
        if (cleanText.length >= 5) return `${cleanText.slice(0, 2)}/${cleanText.slice(2, 4)}/${cleanText.slice(4)}`;
        if (cleanText.length >= 3) return `${cleanText.slice(0, 2)}/${cleanText.slice(2)}`;
        return cleanText;
    }

    // Atualiza o estado com a máscara
    function handleChangeBirthDate(text: string) {
        setBirthDate(formatDate(text));
    }

    return (
        <View style={{ backgroundColor: '#E0E8F9', flex: 1 }}>
            <View style={{
                marginTop: 60
            }}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={0}
                    labels={["Dados pessoais", "Dados financeiros"]}
                    stepCount={2}
                />
            </View>
            <View style={styles.container} >
                <View style={{ marginBottom: 50 }} >
                    <Text style={{ color: '#4A4A4A', fontSize: 34, fontFamily: 'Manrope', fontWeight: "bold", maxWidth: 230, textAlign: 'center' }}>Informações Pessoais</Text>
                </View>
                <View >
                    <Input placeholder="Como devo te chamar?" icon="person-circle-outline" value={name} onChangeText={setName} />
                    <Input 
                        placeholder="Data de nascimento" 
                        icon="calendar-outline" 
                        keyboardType="numeric" 
                        value={birthDate} 
                        onChangeText={handleChangeBirthDate} 
                        maxLength={10} // para limitar dd/mm/yyyy
                    />
                    <Input placeholder="Digite seu e-mail" icon="mail-outline" value={email} onChangeText={setEmail} />
                    <Input placeholder="Senha" icon="lock-closed-outline" isPassword value={password} onChangeText={setPassword} />
                </View>
                <View style={{ flexDirection: 'row', gap: 1, marginLeft: -5, marginTop: 5 }}>
                    <View style={{ marginTop: 10 }}>
                        <Checkbox
                            value={isChecked}
                            onValueChange={setIsChecked}
                            color={isChecked ? '#A3C0AC' : '#4a4a4a'}
                            style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 3 }} />
                    </View>
                    <View style={{ marginLeft: 12 }}>
                        <Text style={{ color: '#4A4A4A', fontFamily: 'Manrope', fontSize: 14 }}>Declaro que li e concordo com:</Text>
                        <Text style={{ textDecorationLine: 'underline', color: '#4A4A4A', fontFamily: 'Manrope', fontSize: 14, fontWeight: '600' }}>Termo de uso e Política de Privacidade</Text>
                    </View>
                </View>
                <View style={{ marginTop: 60, marginBottom: 60 }}>
                    <Button title="Avançar" onPress={() => router.replace('/auth/registerFinance')} />
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', gap: 2, marginBottom: 40 }}>
                    <Text style={{ color: '#4A4A4A', fontFamily: 'Manrope', fontSize: 16 }}>
                        Já possui uma conta?
                    </Text>
                    <TouchableOpacity onPress={() => router.replace("/auth/login")}>
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
        flex: 1,
        backgroundColor: '#E0E8F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
