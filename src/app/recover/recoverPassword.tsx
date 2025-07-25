import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../../components/botao";
import InputVerication from "../../../components/inputVerication";

export default function RecoverPassword() {
  return (
    <View style={styles.container}>
      <View style={styles.textoSenha}>
        <Text style={styles.title}>
          Recuperação de senha
        </Text>
      </View>

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>
          Agora, insira o código que te enviamos por e-mail para criar uma{' '}
          <Text style={styles.boldText}>nova senha</Text>
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <InputVerication />
      </View>

      <View style={styles.resendContainer}>
        <TouchableOpacity>
          <Text style={styles.resendText}>Reenviar código</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Continuar" onPress={() => router.replace("/recover/changePassword")} />
      </View>

      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => router.replace("/recover/forgetPassword")}>
          <Text style={styles.backLink}>Voltar para tela anterior</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 24,
  },
  textoSenha: {
    marginTop: 40,
  },
  title: {
    color: '#4A4A4A',
    fontSize: 34,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    maxWidth: 250,
    textAlign: 'center',
    lineHeight: 40,
  },
  subtitleContainer: {
    marginTop: 20,
    maxWidth: 300,
    paddingHorizontal: 10,
  },
  subtitle: {
    color: '#4A4A4A',
    fontSize: 16,
    fontFamily: 'Manrope',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: 60,
    width: '100%',
  },
  resendContainer: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
  },
  resendText: {
    color: '#4A4A4A',
    fontSize: 12,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    maxWidth: 300,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 45,
    width: '100%',
    alignItems:"center",
  },
  linkContainer: {
    marginTop: 220,
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backLink: {
    color: '#4A4A4A',
    fontSize: 16,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    maxWidth: 300,
    textAlign: 'center',
  },
});
