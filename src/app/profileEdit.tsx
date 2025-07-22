import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import BotaoComConfirmacao from '../../components/buttonConfirm';
import EditarFotoPerfil from '../../components/EditPhoto';
import HeaderProfile from "../../components/headerProfile";
import InputRenda from "../../components/inputRenda";
import { API_BASE_URL, ENDPOINTS } from "../config/api";

export default function ProfileEdit() {
  const [dataNascimento, setDataNascimento] = useState('');
  const [nomeUser, setNomeUser] = useState('');
  const [email, setEmail] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [senhaNova, setSenhaNova] = useState('');


  // Formata data 'yyyy-mm-dd' para 'dd/mm/yyyy'
  function formatDateFromString(dateStr: string) {
    if (dateStr.length !== 8) return dateStr;
    const dia = dateStr.slice(0, 2);
    const mes = dateStr.slice(2, 4);
    const ano = dateStr.slice(4);
    return `${dia}/${mes}/${ano}`;
  }


  // Atualiza dataNascimento conforme o input do usuário (formato dd/mm/yyyy)
  function handleChangeData(text: string) {
    // Remove tudo que não é número
    const raw = text.replace(/\D/g, '');

    let formatted = '';
    if (raw.length <= 2) {
      formatted = raw;
    } else if (raw.length <= 4) {
      formatted = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    } else if (raw.length <= 8) {
      formatted = `${raw.slice(0, 2)}/${raw.slice(2, 4)}/${raw.slice(4)}`;
    } else {
      formatted = `${raw.slice(0, 2)}/${raw.slice(2, 4)}/${raw.slice(4, 8)}`;
    }

    setDataNascimento(formatted);
  }



  async function carregarUsuario() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.USER_INFO}`, {
          headers: { usuario_id: userId }
        });
        const { nome, email, dt_nasc } = response.data;
        setNomeUser(nome);
        setEmail(email);
        setDataNascimento(formatDateFromString(dt_nasc));
      }
    } catch (error) {
      console.error('Erro ao carregar usuário no perfil:', error);
    }
  }

  async function handleSalvar() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return;

      const dataFormatada = dataNascimento.replace(/\D/g, '');
      console.log('Verificando userId:', userId);
      console.log('Senha Atual:', senhaAtual);
      // Atualiza nome, email e data
      await axios.put(`${API_BASE_URL}${ENDPOINTS.UPDATE_USER}`, {
        usuario_id: userId,
        nome: nomeUser,
        email,
        data_nascimento: dataFormatada,
      });

      await AsyncStorage.setItem('userName', nomeUser);

      // Se for alterar senha
      if (senhaAtual && senhaNova) {
        // 1️⃣ Verificar se senhaAtual está correta
        const verifyResponse = await axios.post(`${API_BASE_URL}/auth/verificarSenha`, {
          usuario_id: userId,
          senha: senhaAtual,
        });

        if (!verifyResponse.data.valida) {
          Alert.alert('Erro', 'Senha atual incorreta.');
          return;
        }

        // 2️⃣ Alterar a senha no backend
        await axios.put(`${API_BASE_URL}/auth/alterarSenha`, {
          usuario_id: userId,
          nova_senha: senhaNova,
        });

        Alert.alert('Sucesso', 'Perfil e senha atualizados com sucesso!');
      } else {
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      Alert.alert('Erro', 'Erro ao atualizar perfil. Tente novamente.');
    }
  }



  useEffect(() => {
    carregarUsuario();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // ajuste se necessário
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        overScrollMode="never"
      >
        <View style={styles.Background}>
          <HeaderProfile showBackButton />

          {/* Wrapper para a foto */}
          <View style={styles.fotoWrapper}>
            <EditarFotoPerfil />
          </View>

          <View style={styles.Card}>
            <Text style={[styles.Label, { paddingBottom: 20 }]}>Informações pessoais</Text>

            <InputRenda
              placeholder={nomeUser}
              icon="person-circle-outline"
              onChangeText={setNomeUser}
              isEditable={true}
              value={nomeUser}
              error=""
            />

            <InputRenda
              placeholder={dataNascimento ? dataNascimento : '06/04/2024'}
              icon="calendar-outline"
              keyboardType="numeric"
              maxLength={10}
              value={dataNascimento }
              onChangeText={handleChangeData}
              isEditable={true}
              error=""
            />

            <InputRenda
              placeholder={email ? email : 'exemplo@exemplo.com'}
              icon="mail-outline"
              onChangeText={setEmail}
              isEditable={true}
              value={email }
              error=""
            />
          </View>

          <View style={{ marginTop: 20, marginBottom: 10, width: '90%', alignItems: 'flex-start' }}>
            <Text
              style={{
                fontFamily: 'Manrope',
                fontSize: 20,
                fontWeight: '600',
                color: '#4a4a4a',
                textAlign: 'left',
              }}
            >
              Informações de segurança
            </Text>
          </View>

          <View style={[styles.Card, { paddingTop: 30 }]}>
            <Text style={[styles.TextProfile]}>
              Deseja alterar sua <Text style={{ fontWeight: "bold" }}>senha?</Text>
            </Text>

            <InputRenda
              placeholder="Senha atual"
              icon="lock-closed-outline"
              isPassword
              value={senhaAtual}
              onChangeText={setSenhaAtual}
              error=""
            />

            <InputRenda
              placeholder="Senha nova"
              icon="lock-closed-outline"
              isPassword
              isEditable={true}
              value={senhaNova}
              onChangeText={setSenhaNova}
              error="" />


          </View>

          <View style={{ height: 80, marginTop: 30, }}>
            <BotaoComConfirmacao onConfirm={handleSalvar} />

          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: '#E0E8F9',
    alignItems: 'center',
    paddingTop: 135,
  },

  fotoWrapper: {
    position: 'absolute',
    top: 125,
    zIndex: 100,
    width: 120,
    height: 120,
    alignSelf: 'center',
  },

  Card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 30,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  Label: {
    fontSize: 20,
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    marginBottom: 1,
    fontWeight: 'bold',
    marginTop: -20,
  },

  TextProfile: {
    fontSize: 20,
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    marginBottom: 15,
    lineHeight: 25,
    textAlign: 'center',
  },
});
