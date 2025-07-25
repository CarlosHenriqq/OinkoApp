import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../../components/botao";
import Input from "../../../components/input";

export default function ForgetPassword() {
  return (
    <View style={styles.container}>
      <View style={styles.textoSenha}>
        <Text style={styles.title}>
          Esqueceu a sua senha?
        </Text>
      </View>

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>
          Digite o seu e-mail no campo abaixo e lhe enviaremos um código de{' '}
          <Text style={styles.boldText}>recuperação de senha</Text>
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Input placeholder="Digite seu E-mail" icon="mail-outline" />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Continuar" onPress={() => router.replace("/recover/recoverPassword")} />
      </View>

      <View style={styles.linkContainer}>
        <Text style={styles.normalText}>Já possui conta?</Text>
        <TouchableOpacity onPress={() => router.replace("/auth/login")}>
          <Text style={styles.linkText}>Clique aqui</Text>
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
    paddingHorizontal: 24, // espaço lateral para evitar "grudar" na borda
  },
  textoSenha: {
    marginTop: 40,
  },
  title: {
    color: '#4A4A4A',
    fontSize: 34,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    maxWidth: 198,
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
    marginTop: 70,
    width: '100%',
    alignItems:"center",
  },
  buttonContainer: {
    marginTop: 50,
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
  normalText: {
    color: '#4A4A4A',
    fontSize: 16,
    fontFamily: 'Manrope',
    fontWeight: 'normal',
    maxWidth: 300,
    textAlign: 'center',
  },
  linkText: {
    color: '#4A4A4A',
    fontSize: 16,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    maxWidth: 300,
    textAlign: 'center',
  },
});
