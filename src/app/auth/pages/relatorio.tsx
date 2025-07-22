import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import {
    Alimentacao,
    Assinaturas,
    Cartao,
    Contas,
    Cuidados,
    Divida,
    Educacao,
    Entretenimento,
    Moradia,
    Outros,
    Pets,
    Saude,
    Transporte,
} from "../../../../assets/iconsCategorias";
import NewGasto from '../../../../components/NewGasto';

import { useFocusEffect } from "@react-navigation/native";
import BotaoComConfirmacaoDelete from "../../../../components/buttonConfirmDelete";
import GastoCategoriaRelatorio from "../../../../components/gastoCategoriaRelatorio";
import Header from "../../../../components/header";
import NavegacaoMeses from "../../../../components/navegacaoMeses";
import { API_BASE_URL, ENDPOINTS } from "../../../config/api";

const { width } = Dimensions.get("window");

interface Gasto {
  id: number;
  valor: number;
  data: string;
  descricao: string;
  categoria_nome: string;
}

interface CategoriaAgrupada {
  nome: string;
  valorTotal: number;
  gastos: Gasto[];
}

export default function Relatorio() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth());
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());
  const [userId, setUserId] = useState<number | null>(null);
  const [editandoGasto, setEditandoGasto] = useState<Gasto | null>(null);
  const [gastoParaExcluir, setGastoParaExcluir] = useState<number | null>(null);
  const [modalVisivel, setModalVisivel] = useState(false);


  function abrirModalExclusao(id: number) {
    setGastoParaExcluir(id);
    setModalVisivel(true);
  }

  function fecharModal() {
    setModalVisivel(false);
    setGastoParaExcluir(null);
  }

  async function handleConfirmarExclusao() {
    if (!gastoParaExcluir) return;
    try {
      await axios.delete(`${API_BASE_URL}${ENDPOINTS.GASTOS_DELETE}`, {
        data: { gastoId: gastoParaExcluir },
      });
      buscarGastos();
    } catch (error) {
      console.error("Erro ao excluir gasto:", error);
    }
    fecharModal();
  }

  function handleEditarGasto(gasto: Gasto) {
    setEditandoGasto(gasto);
  }



  const iconMap = {
    'Alimentação': Alimentacao,
    'Pets': Pets,
    'Dívidas': Divida,
    'Transporte': Transporte,
    'Educação': Educacao,
    'Saúde': Saude,
    'Entretenimento': Entretenimento,
    'Moradia': Moradia,
    'Contas do dia a dia': Contas,
    'Cartão de crédito': Cartao,
    'Cuidados Pessoais': Cuidados,
    'Outros': Outros,
    'Assinatura': Assinaturas
  };

  useEffect(() => {
    async function carregarUserId() {
      const id = await AsyncStorage.getItem("userId");
      if (id) setUserId(Number(id));
    }
    carregarUserId();
  }, []);

  const buscarGastos = useCallback(async () => {
    if (!userId) return;
    try {
      const mesParaEnvio = mesSelecionado + 1;
      const response = await axios.get<Gasto[]>(`${API_BASE_URL}${ENDPOINTS.EXTRATO}`,
        {
          headers: { usuario_id: userId.toString() },
          params: { ano: anoSelecionado, mes: mesParaEnvio },
        }
      );
      setGastos(response.data);
    } catch (error) {
      console.error("Erro ao buscar gastos:", error);
    }
  }, [userId, mesSelecionado, anoSelecionado]);

  useEffect(() => {
    buscarGastos();
  }, [buscarGastos]);

  useFocusEffect(
          useCallback(() => {
              buscarGastos();
              
          }, [buscarGastos])
      );


  // Agrupar gastos por categoria
  const categoriasAgrupadas: CategoriaAgrupada[] = [];
  gastos.forEach((gasto) => {
    let categoria = categoriasAgrupadas.find((c) => c.nome === gasto.categoria_nome);
    if (!categoria) {
      categoria = {
        nome: gasto.categoria_nome,
        valorTotal: 0,
        gastos: [],
      };
      categoriasAgrupadas.push(categoria);
    }
    categoria.valorTotal += Number(gasto.valor);
    categoria.gastos.push(gasto);
  });

  function formatarDataBR(dataISO: string) {
    if (!dataISO) return '';
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
  }
  useEffect(() => {
    console.log("Gasto para excluir:", gastoParaExcluir);
  }, [gastoParaExcluir]);



  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} overScrollMode="never">
      <View style={styles.Background}>
        <Header />

        <Text style={styles.TextTop}>Relatório de gastos mensais</Text>

        <NavegacaoMeses
          mesSelecionado={mesSelecionado}
          anoSelecionado={anoSelecionado}
          setMesSelecionado={setMesSelecionado}
          setAnoSelecionado={setAnoSelecionado}
        />

        <View style={styles.expenseContainer}>
          <Text style={{ fontSize: 16, color: "#4A4A4A", fontFamily: "Manrope" }}>
            Nesse mês você gastou:
          </Text>
          <Text style={{ fontSize: 18, color: "#526471", fontFamily: "Manrope", fontWeight: "600" }}>
            R${" "}
            {gastos
              .reduce((acc, g) => acc + Number(g.valor), 0)
              .toFixed(2)
              .replace(".", ",")}
          </Text>
        </View>

        <View style={{ marginTop: 20, marginBottom: 10, width: "90%", alignItems: "flex-start" }}>
          <Text
            style={{
              fontFamily: "Manrope",
              fontSize: 20,
              fontWeight: "600",
              color: "#4a4a4a",
              textAlign: "left",
            }}
          >
            Resumo total dos gastos
          </Text>
        </View>

        <View style={[styles.Card, { paddingTop: 30 }]}>
          {categoriasAgrupadas.map((categoria) => {
            const Imagem = iconMap[categoria.nome] || Outros;
            return (
              <GastoCategoriaRelatorio
                key={categoria.nome}
                titulo={categoria.nome}
                subtituloFechado="Clique para ver os gastos"
                subtituloAberto="Clique para fechar os gastos"
                valor={`R$${categoria.valorTotal.toFixed(2).replace(".", ",")}`}
                Imagem={Imagem}
                subgastos={categoria.gastos.map((g) => ({
                  descricao: g.descricao,
                  valor: `R$${Number(g.valor).toFixed(2).replace(".", ",")}`,
                  data: formatarDataBR(g.data),
                  id: g.id,
                  categoria_id: g.id_cat
                }))}
                onEdit={(gastoSub) => handleEditarGasto({
                  id: gastoSub.id,
                  descricao: gastoSub.descricao,
                  valor: Number(gastoSub.valor.replace('R$', '').replace(',', '.')),
                  data: gastoSub.data,
                  categoria_nome: categoria.nome,
                  categoria_id: gastoSub.categoria_id
                  
                })}
                onDelete={(id) => abrirModalExclusao(id)}
              />


            );
          })}
        </View>

        <View style={{ height: 20 }} />
      </View>
      <NewGasto
        visible={!!editandoGasto}
        onClose={() => setEditandoGasto(null)}
        onSave={async () => {
          setEditandoGasto(null);
          buscarGastos();
        }}
        gasto={editandoGasto}
      />

      {gastoParaExcluir && (
        <BotaoComConfirmacaoDelete
          visible={modalVisivel}
          onConfirm={handleConfirmarExclusao}
          onCancel={fecharModal}
          titulo="Excluir Gasto"
          mensagem="Você tem certeza que deseja excluir este gasto?"
          textoBotaoConfirmar="Excluir"
          textoBotaoCancelar="Cancelar"
        />
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: "#E0E8F9",
    alignItems: "center",
  },

  Card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    paddingTop: 60,
    height: 620,
    paddingBottom: 30,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  TextTop: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4a4a4a",
    marginTop: 50,
    fontFamily: "Manrope",
  },

  expenseContainer: {
    borderRadius: 30,
    backgroundColor: "#ffffff",
    width: 315,
    height: 50,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});
