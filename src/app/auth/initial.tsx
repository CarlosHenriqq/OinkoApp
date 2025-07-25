import { useRouter } from "expo-router";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Oinko from '../../../assets/images/oinko.svg';
import { Button } from "../../../components/botao";

const { width } = Dimensions.get('window');

export default function Initial() {
  const router = useRouter();

  function handlePressLogin() {
    router.push('/auth/login');
  }

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>
          O controle da sua
          <Text style={styles.highlight}> grana </Text>
          começa aqui
        </Text>

        <Oinko
          width={width * 0.7}
          height={(width * 0.7) * (450.61 / 293.95)}
          style={styles.image}
        />

        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handlePressLogin} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Não possui uma conta?</Text>
          <TouchableOpacity onPress={() => router.push('/auth/register')}>
            <Text style={styles.footerLink}>Clique aqui</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#E0E8F9',
  },
  container: {
    flex: 1,
    backgroundColor: '#E0E8F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 65,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Manrope',
    fontSize: 34,
    color: '#4A4A4A',
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: '90%',
    marginBottom: 40,
    marginTop: 28,
    lineHeight: 35,
  },
  highlight: {
    fontWeight: '800',
    textAlign: 'justify',
  },
  image: {
    marginBottom: 50,
  },
  buttonContainer: {
    width: '80%',
    alignItems: "center",
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 35,
  },
  footerText: {
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    fontSize: 16,
  },
  footerLink: {
    textDecorationLine: 'underline',
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    fontSize: 16,
    marginLeft: 4,
  },
});
