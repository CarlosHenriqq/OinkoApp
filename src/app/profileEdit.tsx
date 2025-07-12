import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import BotaoComConfirmacao from '../../components/buttonConfirm';
import HeaderProfile from "../../components/headerProfile";
import InputRenda from "../../components/inputRenda";

export default function ProfileEdit() {
  const [dataNascimento, setDataNascimento] = useState('');

  function formatDate(text: string) {
    let cleanText = text.replace(/\D/g, '');
    if (cleanText.length > 8) cleanText = cleanText.slice(0,8);
    if (cleanText.length >= 5) return `${cleanText.slice(0,2)}/${cleanText.slice(2,4)}/${cleanText.slice(4)}`;
    if (cleanText.length >= 3) return `${cleanText.slice(0,2)}/${cleanText.slice(2)}`;
    return cleanText;
  }

  function handleChangeData(text: string) {
    setDataNascimento(formatDate(text));
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      bounces={false}
      overScrollMode="never"
    >
      <View style={styles.Background}>
        <HeaderProfile showBackButton/>
        <View style={styles.PhotoContainer}>
          <Image
            source={{
              uri: 'https://media-gru2-1.cdn.whatsapp.net/v/t61.24694-24/487493204_1226577862439581_6063975574272192493_n.jpg?ccb=11-4&oh=01_Q5Aa1wFy-tCiXLpgO2Dmhi_4oEJnYi8Lwj_OVNdmwWTsU719uA&oe=687A7C45&_nc_sid=5e03e0&_nc_cat=104'
            }}
            style={styles.Photo}
          />
        </View>

        <View style={styles.Card}>
          
          
          <Text style={[styles.Label, { paddingBottom: 20 }]}>Informações pessoais</Text>

          <InputRenda
            placeholder="Carlos Henrique"
            icon="person-circle-outline"
            isEditable={false}
          />

          <InputRenda
            placeholder="04/02/2004"
            icon="calendar-outline"
            keyboardType="numeric"
            maxLength={10}
            value={dataNascimento}
            onChangeText={handleChangeData}
            isEditable={true}
            />


          <InputRenda
            placeholder="carloslindo@gmail.com"
            icon="mail-outline"
            isEditable={false}
          />
        </View>

        <View style={{ marginTop: 20, marginBottom: 10, width: '90%', alignItems: 'flex-start' }}>
          <Text
            style={{
              fontFamily: 'manrope',
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

  PhotoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FACFBC',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    position: 'absolute',
    top: 65,
    zIndex: 2,
  },

  Photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  Card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    paddingTop: 60,
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
