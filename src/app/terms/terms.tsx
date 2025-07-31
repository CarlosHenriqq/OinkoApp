import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import Oinko1 from '../../../assets/images/oinko1.svg';
import { Button } from "../../../components/botao";
const { width } = Dimensions.get('window');




export default function Terms(){
    const [isChecked, setIsChecked] = useState(false);
return(
    

    <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    bounces={false}
    overScrollMode="never"
    >

            <View style={styles.Background}>
                    <View style={{alignItems: 'center',}}>
                        <Oinko1 width={230} style={{ marginTop: 100, alignSelf:"center" }} />
                        
                        <Text style={[styles.TextTop,{lineHeight:40, marginTop:30, maxWidth:300}]}>Termos de Uso</Text>
                        <Text style={styles.TextSub}>Última atualização: 06/07/2025</Text>
                    </View>

                        <View style={styles.Card}>
                            
                           <Text style={styles.TextTitle}>Bem-vindo ao Oinko</Text>
                           <Text style={styles.TextLong}>Ao usar este aplicativo, você concorda com os termos descritos abaixo. Leia com atenção antes de continuar.</Text>

                           <Text style={styles.TextTitle}>O que é o Oinko</Text>
                           <Text style={styles.TextLong}>O Oinko é um aplicativo que ajuda você a organizar sua vida financeira, registrar seus gastos e planejar seu orçamento de forma simples e eficiente.</Text>

                           <Text style={styles.TextTitle}>Regras de Uso</Text>
                           <Text style={styles.TextLong}>Ao utilizar o Oinko, você se compromete a:</Text>
                           <Text style={styles.TextLong}>{`\u2022`}  Usar o aplicativo de forma legal e consciente</Text>
                           <Text style={styles.TextLong}>{`\u2022`}  Fornecer informações verdadeiras e manter sua conta segura</Text>
                           <Text style={styles.TextLong}>{`\u2022`}  Não tentar invadir, burlar ou prejudicar o funcionamento do sistema</Text>

                           <Text style={styles.TextTitle}>Conta do Usuário</Text>
                           <Text style={styles.TextLong}>Você é o único responsável pelas informações cadastradas e pela segurança dos seus dados de acesso.</Text>

                           <Text style={styles.TextTitle}>Alterações no Aplicativo</Text>
                           <Text style={styles.TextLong}>O Oinko pode modificar, suspender ou remover funcionalidades a qualquer momento, com ou sem aviso prévio.</Text>

                           <Text style={styles.TextTitle}>Limitação de Responsabilidade</Text>
                           <Text style={styles.TextLong}>O Oinko oferece suporte à organização financeira, mas não se responsabiliza por decisões tomadas com base nas informações do aplicativo.</Text>

                           <Text style={styles.TextTitle}>Propriedade Intelectual</Text>
                           <Text style={styles.TextLong}>O nome, logotipo, conteúdo e estrutura do Oinko são protegidos por lei. É proibida a reprodução ou uso não autorizado de qualquer parte do aplicativ</Text>

                           <Text style={styles.TextTitle}>Legislação Aplicável</Text>
                           <Text style={styles.TextLong}>Este termo é regido pelas leis brasileiras. Em caso de disputa, será utilizado o foro da comarca do usuário, conforme a legislação vigente.</Text>

                           <Text style={styles.TextTitle}>Contato</Text>
                           <Text style={styles.TextLong}>Em caso de dúvidas ou solicitações, entre em contato com a equipe pelo                           e-mail:<Text style={{ color: '#517CEA', textDecorationLine: "underline" }}>oinkofinancas@gmail.com</Text></Text>
                            <View style={{height:30}}></View>
                            </View>

                        <View style={{alignItems: 'center',}}>
                        <Text style={[styles.TextTop,{lineHeight:45, marginTop:50}]}>Política</Text>
                        <Text style={[styles.TextTop,{lineHeight:35,}]}> de Privacidade</Text>
                      
                        <Text style={styles.TextSub}>Última atualização: 06/07/2025</Text>
                    </View>

                        <View style={styles.Card}>
                            
                           <Text style={styles.TextTitle}>Informações Coletadas</Text>
                           <Text style={styles.TextLong}>Coletamos os seguintes dados:</Text>
                           <Text style={styles.TextLong}>{`\u2022`}  Nome e e-mail do usuário</Text>
                           <Text style={styles.TextLong}>{`\u2022`}  Dados financeiros inseridos no app (gastos, metas, categorias)</Text>
                           <Text style={styles.TextLong}>{`\u2022`}  Informações técnicas do dispositivo (versão do sistema, data e horário de acesso)</Text>

                           <Text style={styles.TextTitle}>Uso das Informações</Text>
                           <Text style={styles.TextLong}>Os dados coletados são utilizados para:</Text>
                           <Text style={styles.TextLong}>{`\u2022`}  Oferecer uma experiência personalizada</Text>
                           <Text style={styles.TextLong}>{`\u2022`}  Garantir o bom funcionamento e a segurança do aplicativo</Text>
                           <Text style={styles.TextLong}>{`\u2022`}  Melhorar funcionalidades e suporte ao usuário</Text>

                           <Text style={styles.TextTitle}>Compartilhamento de Dados</Text>
                           <Text style={styles.TextLong}>As informações do usuário não são vendidas ou compartilhadas, exceto:</Text>
                           <Text style={styles.TextLong}>{`\u2022`}  Quando exigido por lei</Text>
                           <Text style={styles.TextLong}>{`\u2022`}  Com parceiros de infraestrutura, como servidores e serviços em nuvem, com garantia de sigilo e segurança</Text>

                           <Text style={styles.TextTitle}>Segurança dos Dados</Text>
                           <Text style={styles.TextLong}>Adotamos práticas técnicas e administrativas para proteger os dados pessoais contra acesso não autorizado, vazamentos ou perdas.</Text>

                           <Text style={styles.TextTitle}>Direitos do Usuário</Text>
                           <Text style={styles.TextLong}>Você tem direito a:</Text>
                           <Text style={styles.TextLong}>{`\u2022`}  Acessar, corrigir ou excluir seus dados</Text>
                           <Text style={styles.TextLong}>{`\u2022`}  Solicitar a portabilidade das informações</Text>
                           <Text style={styles.TextLong}>{`\u2022`}  Revogar o consentimento para uso dos dados a qualquer momento</Text>

                           <Text style={styles.TextTitle}>Cookies</Text>
                           <Text style={styles.TextLong}>O aplicativo pode utilizar cookies e tecnologias semelhantes para melhorar sua navegação. O uso pode ser desativado nas configurações do seu dispositivo.</Text>

                           <Text style={styles.TextTitle}>Alterações na Política</Text>
                           <Text style={styles.TextLong}>Podemos atualizar esta política de tempos em tempos. Sempre que isso ocorrer, notificaremos você dentro do aplicativo.</Text>

                           <Text style={styles.TextTitle}>Contato</Text>
                           <Text style={styles.TextLong}>Em caso de dúvidas ou solicitações, entre em contato com a equipe pelo                           e-mail:<Text style={{ color: '#517CEA', textDecorationLine: "underline" }}>oinkofinancas@gmail.com</Text></Text>
                        
                         <View style={{alignItems:"center", marginTop: 30, marginBottom: 30}}>
                            <Button title="Li e Concordo" onPress={() => router.back()} />
                          </View>                 
                        </View>
                        <View style={{height:30}}></View>

                        
                        
                        
                </View>
        </ScrollView>
    )}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: '#E0E8F9',
    alignItems: 'center',
  },

  Card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 30,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
  },

  TextSub: {
    fontSize: 18,
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    fontWeight: '600',
    textAlign: "center",
  },
  TextTop: {
    fontSize: 34,
    fontWeight: "800",
    color: '#4a4a4a',
    marginTop: 10,
    fontFamily: 'Manrope',
    textAlign: "center",
    maxWidth:260,
    maxHeight: 35,
    },
    TextTitle: {
    fontSize: 20,
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    fontWeight: '600',
    marginLeft: 20,
    textAlign: "left",
    marginTop:30,
  
  },
    TextLong: {
    fontSize: 16,
    fontWeight: "normal",
    color: '#4a4a4a',
    marginTop: 10,
    fontFamily: 'Manrope',
    textAlign: "left",
    marginLeft: 20,
    marginRight: 20,
    lineHeight: 18,
  
    },

    expenseContainer: {
        borderRadius: 30,
        backgroundColor: '#ffffff',
        width:315,
        height: 50,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
    },
});

