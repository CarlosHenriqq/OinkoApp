import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../../../components/botao";
import { ButtonMenor } from "../../../components/botaoMenor";
import HeaderProfile from "../../../components/headerProfile";
import InputCategoria from "../../../components/inputCategoria";
import InputRenda from "../../../components/inputRenda";

export default function Profile() {
  const categorias = [
    ["Dívidas", "Transporte", "Pets"],
    ["Saúde", "Cuidados Pessoais"],
    ["Educação", "Entretenimento"],
    ["Assinatura", "Alimentação"],
    ["Moradia", "Cartão de crédito"],
    ["Contas do dia a dia", "Outros"],
  ];

  const categoriasWidth = {
    "Dívidas": 91,
    "Transporte": 123,
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
  const [renda, setRenda] = useState(""); // valor em centavos para facilitar formatação
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [nomeUser, setNomeUser] = useState('');
  const [email, setEmail] = useState('');
  

  useEffect(() => {
    async function carregarFoto() {
      const uri = await AsyncStorage.getItem("fotoPerfil");
      if (uri) setFotoUri(uri);
    }
    carregarFoto();
    carregarUsuario();
  }, []);

  function handleToggleCategory(category: string) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
    } else {
      if (selectedCategories.length < 7) {
        setSelectedCategories((prev) => [...prev, category]);
      }
    }
  }

  // Função para formatar valor em centavos para moeda BRL
 function formatMoney(value: string) {
    const numericValue = value.replace(/\D/g, "");
    const number = Number(numericValue) / 100;
    if (isNaN(number)) return "";
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
}

function handleChangeRenda(text: string) {
    const clean = text.replace(/\D/g, '');
    const formatted = formatMoney(clean);
    setRenda(formatted);
}

async function carregarUsuario() {
    try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
            const response = await axios.get('http://192.168.1.107:3000/auth/userInfo', {
                headers: { usuario_id: userId }
            });
            const { nome, email, renda } = response.data;
            setNomeUser(nome);
            setEmail(email);
            if (renda !== null && renda !== undefined) {
                const rendaFormatada = formatMoney((renda * 100).toString());
                setRenda(rendaFormatada);
            } else {
                setRenda('');
            }
        }
    } catch (error) {
        console.error('Erro ao carregar usuário no perfil:', error);
    }
}



  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      bounces={false}
      overScrollMode="never"
    >
      <View style={styles.Background}>
        <HeaderProfile />

        <View style={styles.PhotoContainer}>
          <Image
            source={
              fotoUri
                ? { uri: fotoUri }
                : require("../../../assets/images/perfil.png") // ajuste o caminho conforme seu projeto
            }
            style={styles.Photo}
          />
        </View>

        <View style={styles.Card}>
          <Text style={styles.Label}>Informações pessoais</Text>
          <Text style={styles.Name}>{nomeUser}</Text>
          <Text style={styles.Mail}>{email}</Text>

          <ButtonMenor
            title="Editar"
            icon="create-outline"
            onPress={() => router.replace("/profileEdit")}
          />
        </View>

        <View
          style={{ marginTop: 20, marginBottom: 10, width: "90%", alignItems: "flex-start" }}
        >
          <Text
            style={{
              fontFamily: "manrope",
              fontSize: 20,
              fontWeight: "600",
              color: "#4a4a4a",
              textAlign: "left",
            }}
          >
            Informações financeiras
          </Text>
        </View>

        <View style={[styles.Card, { paddingTop: 30 }]}>
          <Text style={[styles.TextProfile]}>
            Deseja mudar sua <Text style={{ fontWeight: "bold" }}>renda?</Text>
          </Text>

          <InputRenda
            placeholder="R$1300,00"
            icon="cash-outline"
            keyboardType="numeric"
            value={formatMoney(renda)}
            onChangeText={handleChangeRenda}
            isEditable={false}
          />

          <Text style={[styles.TextProfile]}>
            Deseja mudar suas categorias?{" "}
            <Text style={{ fontWeight: "bold" }}>Selecione até 7</Text>
          </Text>

          <View style={{ paddingBottom: 20 }}>
            {categorias.map((row, idx) => (
              <View
                key={idx}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 13,
                  maxWidth: 310,
                }}
              >
                {row.map((cat) => (
                  <InputCategoria
                    key={cat}
                    title={cat}
                    width={categoriasWidth[cat]}
                    isSelected={selectedCategories.includes(cat)}
                    onPress={() => handleToggleCategory(cat)}
                    backgroundColorSelect="#526471"
                    backgroundColorUnSelect="#ffff"
                    borderColorSelect="#526471"
                    borderColorUnSelect="#526471"
                    textUnselect="#526471"
                  />
                ))}
              </View>
            ))}
          </View>

          <Button title="Salvar alterações" onPress={() => router.replace("/pages/profile")} />
        </View>

        <View style={{ height: 20 }}></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: "#E0E8F9",
    alignItems: "center",
    paddingTop: 135,
  },

  PhotoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FACFBC",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
    position: "absolute",
    top: 65,
    zIndex: 2,
  },

  Photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  Card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  Label: {
    fontSize: 20,
    color: "#4A4A4A",
    fontFamily: "Manrope",
    marginBottom: 1,
    fontWeight: "bold",
  },

  Name: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#4A4A4A",
    fontFamily: "Manrope",
    marginBottom: -4,
  },

  Mail: {
    fontSize: 16,
    color: "#4A4A4A",
    fontFamily: "Manrope",
    marginBottom: 10,
  },

  TextProfile: {
    fontSize: 20,
    color: "#4A4A4A",
    fontFamily: "Manrope",
    marginBottom: 15,
    lineHeight: 25,
    textAlign: "center",
  },
});
