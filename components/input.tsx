import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const BASE_WIDTH = 390;
const scale = width / BASE_WIDTH;
const scaled = (size: number) => size * scale;

interface InputProps extends TextInputProps {
  placeholder: string;
  icon: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
  error: string;
}

export default function Input({ placeholder, icon, isPassword, error, ...rest }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Ionicons name={icon} size={scaled(24)} color={'#A3C0AC'} />
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          placeholderTextColor="#A3C0AC"
          secureTextEntry={isPassword && !showPassword}
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconRight}
          >
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={scaled(24)}
              color={'#A3C0AC'}
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: scaled(20),
    width: scaled(300),
    alignSelf: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#A3C0AC',
    borderRadius: scaled(20),
    paddingHorizontal: scaled(10),
    paddingVertical: scaled(1),
    backgroundColor: '#ffffff',
    width: '100%',
    height: scaled(50),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: scaled(2) },
    shadowOpacity: 0.4,
    shadowRadius: scaled(2),
    elevation: 3,
    gap:10,
  },
  input: {
    flex: 1,
    fontSize: scaled(18),
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    fontWeight: '800',

  },
  iconRight: {
    position: 'absolute',
    right: scaled(10),
  },
  errorText: {
    color: '#f15757ff',
    fontSize: 12,
    marginTop: scaled(2),
    marginLeft: scaled(10),
    fontFamily: 'Manrope',
    fontWeight: '700',
    textAlign: 'left',
    marginBottom:-19,
  },
});
