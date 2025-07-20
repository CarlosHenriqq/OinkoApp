import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Checkbox from 'expo-checkbox';
import { router } from 'expo-router';
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StepIndicator from 'react-native-step-indicator';
import { Button } from '../../../components/botao';
import Input from "../../../components/input";
import { API_BASE_URL, ENDPOINTS } from '../../config/api';
import { isValidDate, isValidEmail, isValidPassword } from '../../config/mask';

export default function Register() {


    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        birthDate: '',
        email: '',
        password: '',
        
    });
 const validateForm = () => {
  let isValid = true;
  const newErrors = {...errors};

  if (!name) {
    newErrors.name = 'Nome é obrigatório';
    isValid = false;
  } else {
    newErrors.name = '';
  }

  if (!birthDate) {
    newErrors.birthDate = 'Data de nascimento é obrigatória';
    isValid = false;
  } else if (!isValidDate(birthDate)){
    newErrors.birthDate = 'Data inválida'
    isValid= false;
  }else {
    newErrors.birthDate = '';
  }
  if (!email) {
    newErrors.email = 'E-mail é obrigatório';
    isValid = false;
  } else if (!isValidEmail(email)) {
    newErrors.email = 'E-mail inválido';
    isValid = false;
  }else {
    newErrors.email = '';
  }
  if (!password) {
    newErrors.password = 'Senha é obrigatória';
    isValid = false;
  } else if (!isValidPassword(password)) {
    newErrors.password = 'A senha precisa ter no mínimo 8 caractéres';
    isValid = false;}
    else {
    newErrors.password = '';
  }
  setErrors(newErrors);
  return isValid;
}

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
    async function handleRegister() {
        if (!isChecked ) {
            alert('Você precisa aceitar os Termos de Uso.');
            return;
        }

        const dataNascimentoSemBarra = birthDate.replace(/\D/g, '');

        console.log('Enviando data_nascimento:', dataNascimentoSemBarra);

        if (dataNascimentoSemBarra.length !== 8) {
            alert('Data de nascimento inválida. Use o formato dd/mm/yyyy.');
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.REGISTER}`, {
                nome: name,
                data_nascimento: dataNascimentoSemBarra,
                email: email,
                senha: password,
            });

            console.log(response.data);
            await AsyncStorage.removeItem('fotoPerfil');
            alert('Cadastro realizado com sucesso!');
            router.replace('/auth/registerFinance');
        } catch (error) {
            console.error(error);
            alert('Erro ao cadastrar. Tente novamente.');
        }
    }

    function formatDate(text:string) {
        let cleanText = text.replace(/\D/g, '');
        if (cleanText.length > 8) cleanText = cleanText.slice(0, 8);
        if (cleanText.length >= 5) return `${cleanText.slice(0, 2)}/${cleanText.slice(2, 4)}/${cleanText.slice(4)}`;
        if (cleanText.length >= 3) return `${cleanText.slice(0, 2)}/${cleanText.slice(2)}`;
        return cleanText;
    }

    function handleChangeBirthDate(text:string) {
        setBirthDate(formatDate(text));
    }


    return (
        <View style={{ backgroundColor: '#E0E8F9', flex: 1 }}>
            <View style={{ marginTop: 60 }}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={0}
                    labels={["Dados pessoais", "Dados financeiros"]}
                    stepCount={2}
                />
            </View>

            <View style={styles.container}>
                <View style={{ marginBottom: 50 }}>
                    <Text style={styles.title}>Informações Pessoais</Text>
                </View>
                <Input placeholder="Como devo te chamar?" icon="person-circle-outline" value={name} onChangeText={setName} error={errors.name}/>
                <Input placeholder="Data de nascimento" icon="calendar-outline" keyboardType="numeric" value={birthDate} onChangeText={handleChangeBirthDate} maxLength={10} error={errors.birthDate} />
                <Input placeholder="Digite seu e-mail" icon="mail-outline" value={email} onChangeText={setEmail} error={errors.email} />
                <Input placeholder="Senha" icon="lock-closed-outline" isPassword value={password} onChangeText={setPassword} error={errors.password} />

                <View style={styles.checkboxContainer}>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? '#A3C0AC' : '#4a4a4a'}
                        style={styles.checkbox}
                    />
                    <View style={{ marginLeft: 12 }}>
                        <Text style={{ color: '#4A4A4A', fontFamily: 'Manrope', fontSize: 14 }}>Declaro que li e concordo com:</Text>
                        <TouchableOpacity onPress={() => router.replace("/terms/terms")}>
                            <Text style={{ textDecorationLine: 'underline', color: '#4A4A4A', fontFamily: 'Manrope', fontSize: 14, fontWeight: '600' }}>Termo de uso e Política de Privacidade</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginTop: 60, marginBottom: 60 }}>
                    <Button title="Avançar" onPress={() => {if (validateForm()) {handleRegister();}}}/>
                </View>

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Já possui uma conta?</Text>
                    <TouchableOpacity onPress={() => router.replace("/auth/login")}>
                        <Text style={styles.loginLink}>Clique aqui</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0E8F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#4A4A4A',
        fontSize: 34,
        fontFamily: 'Manrope',
        fontWeight: 'bold',
        maxWidth: 230,
        textAlign: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    checkbox: {
        marginTop: 10,
        borderRadius: 3,
    },
    checkboxText: {
        color: '#4A4A4A',
        fontFamily: 'Manrope',
        fontSize: 14,
    },
    checkboxLink: {
        textDecorationLine: 'underline',
        color: '#4A4A4A',
        fontFamily: 'Manrope',
        fontSize: 14,
        fontWeight: '600',
    },
    loginContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 2,
        marginBottom: 40,
    },
    loginText: {
        color: '#4A4A4A',
        fontFamily: 'Manrope',
        fontSize: 16,
    },
    loginLink: {
        textDecorationLine: 'underline',
        color: '#4A4A4A',
        fontFamily: 'Manrope',
        fontSize: 16,
    },
})