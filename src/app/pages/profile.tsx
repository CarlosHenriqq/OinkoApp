import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PerflPadrao from '../../../assets/images/cabeca.svg';
import { ButtonMenor } from "../../../components/botaoMenor";
import BotaoComConfirmacao from "../../../components/buttonConfirm";
import HeaderProfile from "../../../components/headerProfile";
import InputCategoria from "../../../components/inputCategoria";
import InputRenda from "../../../components/inputRenda";
import { API_BASE_URL, ENDPOINTS } from "../../config/api";

const { width: screenWidth } = Dimensions.get("window");

export default function Profile() {
  const categorias = [
    ["Dívidas", "Transporte", "Pets"],
    ["Saúde", "Cuidados Pessoais"],
    ["Educação", "Entretenimento"],
    ["Assinaturas", "Alimentação"],
    ["Moradia", "Cartão de crédito"],
    ["Contas do dia a dia", "Outros"],
  ];

  const categoriasWidth = {
    "Dívidas": 95,
    "Transporte": 128,
    "Pets": 70,
    "Saúde": 86,
    "Cuidados Pessoais": 205,
    "Educação": 119,
    "Entretenimento": 175,
    "Assinaturas": 139,
    "Alimentação": 145,
    "Moradia": 102,
    "Cartão de Crédito": 190,
    "Contas do dia a dia": 202,
    "Outros": 91,
  };

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [renda, setRenda] = useState("");
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [nomeUser, setNomeUser] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    carregarUsuario();
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log('montada');
      carregarUsuario();
      carregarCategoriasSelecionadas();
    }, [])
  );

  function handleToggleCategory(category: string) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
    } else {
      if (selectedCategories.length < 7) {
        setSelectedCategories((prev) => [...prev, category]);
      }
    }
  }

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
    const clean = text.replace(/\D/g, "");
    const formatted = formatMoney(clean);
    setRenda(formatted);
  }

  async function carregarUsuario() {
    try {
      const usuarioSalvo = await AsyncStorage.getItem('usuarioPerfil');
      if (usuarioSalvo) {
        const data = JSON.parse(usuarioSalvo);
        setNomeUser(data.nome);
        setEmail(data.email);
        setRenda(formatMoney((data.renda * 100).toString()));

        const urlCompleta = data.image_url
          ? data.image_url.startsWith('/')
            ? `${API_BASE_URL.replace(/\/$/, '')}${data.image_url}`
            : data.image_url
          : null;

        if (urlCompleta) {
          // Tenta carregar imagem do cache local primeiro
          const localPath = await AsyncStorage.getItem('localFotoPerfil');
          if (localPath) {
            const info = await FileSystem.getInfoAsync(localPath);
            if (info.exists) {
              setFotoUri(localPath);
            } else {
              await AsyncStorage.removeItem('localFotoPerfil');
              await baixarESalvarImagem(urlCompleta);
            }
          } else {
            await baixarESalvarImagem(urlCompleta);
          }
        }
      }

      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.USER_INFO}`, {
          headers: { usuario_id: userId }
        });

        const { nome, email, renda, image_url } = response.data;
        setNomeUser(nome);
        setEmail(email);
        setRenda(renda !== null ? formatMoney((renda * 100).toString()) : '');

        const urlCompleta = image_url
          ? image_url.startsWith('/')
            ? `${API_BASE_URL.replace(/\/$/, '')}${image_url}`
            : image_url
          : null;

        if (urlCompleta) {
          const localPath = await AsyncStorage.getItem('localFotoPerfil');
          if (localPath) {
            const info = await FileSystem.getInfoAsync(localPath);
            if (info.exists) {
              setFotoUri(localPath);
            } else {
              await AsyncStorage.removeItem('localFotoPerfil');
              await baixarESalvarImagem(urlCompleta);
            }
          } else {
            await baixarESalvarImagem(urlCompleta);
          }
        }

        await AsyncStorage.setItem('usuarioPerfil', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Erro ao carregar usuário no perfil:', error);
    }
  }

  async function baixarESalvarImagem(url: string) {
    try {
      const localFileUri = FileSystem.documentDirectory + 'fotoPerfil.jpg';
      const downloadResumable = FileSystem.createDownloadResumable(url, localFileUri);
      await downloadResumable.downloadAsync();
      await AsyncStorage.setItem('localFotoPerfil', localFileUri);
      setFotoUri(localFileUri);
    } catch (error) {
      console.error('Erro ao baixar imagem:', error);
      setFotoUri(url); // fallback para url direta
    }
  }

  async function carregarCategoriasSelecionadas() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      console.log(userId);
      if (userId) {
        const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.CATEGORIA_POR_USUARIO}`, {
          headers: { usuario_id: userId }
        });
        const categoriasSelecionadas = response.data.map(cat => cat.nome); // deve vir como ['Pets', 'Saúde', ...]
        setSelectedCategories(categoriasSelecionadas);
        console.log(categoriasSelecionadas);
      }
    } catch (error) {
      console.error("Erro ao carregar categorias selecionadas:", error);
    }
  }

  async function handleSalvarFinanceiro() {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        alert("Usuário não autenticado");
        return;
      }

      const data = {
        usuario_id: userId,
        renda: renda ? Number(renda.replace(/\D/g, "")) : 0,
        categorias: selectedCategories,
      };

      await axios.post(`${API_BASE_URL}${ENDPOINTS.REGISTER_FINANCE}`, data);
    } catch (error) {
      console.error("Erro ao atualizar financeiro:", error);
      alert("Erro ao salvar. Tente novamente.");
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
      <View style={styles.Background}>
        <HeaderProfile showLogoutButton />

        <View style={styles.PhotoContainer}>
  {fotoUri && typeof fotoUri === 'string' && (fotoUri.startsWith('file://') || fotoUri.startsWith('http')) ? (
    <Image
      source={{ uri: fotoUri }}
      style={styles.Photo}
    />
  ) : (
    <PerflPadrao width={120} height={120} />
  )}
</View>

        <View style={[styles.Card, { marginTop: 5 }]}>
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
          style={{
            marginTop: 20,
            marginBottom: 10,
            width: "90%",
            alignItems: "flex-start",
          }}
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
          <Text style={styles.TextProfile}>
            Deseja mudar sua <Text style={{ fontWeight: "bold" }}>renda?</Text>
          </Text>

          <InputRenda
            placeholder="R$1300,00"
            icon="cash-outline"
            keyboardType="numeric"
            value={formatMoney(renda)}
            onChangeText={handleChangeRenda}
            isEditable={false}
            error=""
          />

          <Text style={styles.TextProfile}>
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
                  gap: 5,
                  maxWidth: screenWidth * 0.85,
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

          <BotaoComConfirmacao onConfirm={handleSalvarFinanceiro} />
        </View>

        <View style={{ height: 20 }} />
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
    backgroundColor: "#ffffff",
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
