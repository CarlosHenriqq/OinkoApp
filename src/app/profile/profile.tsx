import { router } from "expo-router";
import { useState } from "react";
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
    "Dívidas": 93,
    "Transporte": 115,
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
  const [renda, setRenda] = useState("130000"); // valor em centavos para facilitar formatação

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

  // Função para tratar mudança do input mantendo só números
  function handleChangeRenda(text: string) {
    // Remove tudo que não for dígito
    const clean = text.replace(/\D/g, "");
    setRenda(clean);
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
            source={{
              uri: "https://media-gru2-1.cdn.whatsapp.net/v/t61.24694-24/487493204_1226577862439581_6063975574272192493_n.jpg?ccb=11-4&oh=01_Q5Aa1wFy-tCiXLpgO2Dmhi_4oEJnYi8Lwj_OVNdmwWTsU719uA&oe=687A7C45&_nc_sid=5e03e0&_nc_cat=104",
            }}
            style={styles.Photo}
          />
        </View>

        <View style={styles.Card}>
          <Text style={styles.Label}>Informações pessoais</Text>
          <Text style={styles.Name}>Carlos Henrique</Text>
          <Text style={styles.Mail}>carloslindo@gmail.com</Text>

          <ButtonMenor
            title="Editar"
            icon="create-outline"
            onPress={() => router.replace("/profile/profileEdit")}
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
            Deseja mudar suas categorias?
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
                  maxWidth: 302,
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

          <Button title="Salvar alterações" onPress={() => router.replace("/profile/profile")} />
        </View>

        <View style={{ height: 90 }}></View>
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
