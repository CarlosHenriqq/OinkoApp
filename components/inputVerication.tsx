import { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const OTPInput = () => {
  const inputRefs = useRef<TextInput[]>([]);
  const [otp, setOtp] = useState(Array(5).fill(''));

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;

    setOtp(newOtp);

    if (text && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref!)}
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          textAlign="center"
        />
      ))}
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12, // espaçamento entre os inputs

  },
  input: {
    width: 48,
    height: 70,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#ADC8B3', // verde suave
    fontSize: 32,
    fontWeight: '500',
    color: '#ADC8B3',
    backgroundColor: '#F2F6FF', // azul muito claro
  },
});
