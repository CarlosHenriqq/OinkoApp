  import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BotaoComConfirmacao from '../../components/buttonConfirm';
import EditarFotoPerfil from '../../components/EditPhoto';
import HeaderProfile from "../../components/headerProfile";
import InputRenda from "../../components/inputRenda";

  export default function ProfileEdit() {
    const [dataNascimento, setDataNascimento] = useState('');
    const [nomeUser, setNomeUser] = useState('');
    const [email, setEmail] = useState('');

    function formatDateFromString(dateStr: string) {
      if (dateStr.length !== 8) return dateStr; // se não for 8 dígitos, retorna como está
      const dia = dateStr.slice(0, 2);
      const mes = dateStr.slice(2, 4);
      const ano = dateStr.slice(4);
      return `${dia}/${mes}/${ano}`;
  }

  function handleChangeData(text: string) {
      setDataNascimento(formatDateFromString(text));
    }
  
    async function carregarUsuario() {
      try {
          const userId = await AsyncStorage.getItem('userId');
          if (userId) {
              const response = await axios.get('http://192.168.1.107:3000/auth/userInfo', {
                  headers: { usuario_id: userId }
              });
            const { nome, email, dt_nasc } = response.data;
            const dateFormate = formatDateFromString(dt_nasc)
              setNomeUser(nome);
              setEmail(email);
              setDataNascimento(dateFormate)
          }
      } catch (error) {
          console.error('Erro ao carregar usuário no perfil:', error);
      }
      
  }
  useEffect(() => {
        carregarUsuario();
        handleChangeData(dataNascimento);
        }, []);
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        overScrollMode="never"
      >
        <View style={styles.Background}>
          <HeaderProfile showBackButton/>

          {/* Wrapper para a foto, com position absolute para flutuar */}
          <View style={styles.fotoWrapper}>
            <EditarFotoPerfil />
          </View>

          <View style={styles.Card}>
            <Text style={[styles.Label, { paddingBottom: 20 }]}>Informações pessoais</Text>

            <InputRenda
              placeholder={nomeUser}
              icon="person-circle-outline"
              isEditable={false}
            />

            <InputRenda
              placeholder={dataNascimento}
              icon="calendar-outline"
              keyboardType="numeric"
              maxLength={10}
              value={dataNascimento}
              onChangeText={handleChangeData}
              isEditable={true}
            />

            <InputRenda
              placeholder={email}
              icon="mail-outline"
              isEditable={false}
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
            >Informações de segurança</Text>
          </View>

          <View style={[styles.Card, { paddingTop: 30 }]}>
            <Text style={[styles.TextProfile]}>
              Deseja alterar sua <Text style={{ fontWeight: "bold" }}>senha?</Text>
            </Text>

            <InputRenda placeholder="Senha atual" icon="lock-closed-outline" isPassword isEditable={false} />

            <InputRenda placeholder="Senha nova" icon="lock-closed-outline" isPassword isEditable={false} />

            <BotaoComConfirmacao />
          </View>

          <View style={{ height: 30 }}></View>
        </View>
      </ScrollView>
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
      top: 125, // ajusta a distância do topo pra posicionar sobre o card
      zIndex: 100,
      width: 120,
      height: 120,
      alignSelf: 'center', // centraliza horizontalmente

    },

    Card: {
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: 20,
      alignItems: 'center',
      paddingTop: 80, // aumentei pra dar espaço para a foto sobreposta
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
      marginTop:-20,
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
