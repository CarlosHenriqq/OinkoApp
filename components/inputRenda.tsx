import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { Dimensions, StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BASE_WIDTH = 390;
const scale = SCREEN_WIDTH / BASE_WIDTH;
const scaled = (size: number) => size * scale;

interface InputProps extends TextInputProps {
  placeholder: string;
  icon: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
  isEditable?: boolean;
}

export default function InputRenda({ placeholder, icon, isPassword, isEditable = false, ...rest }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [editable, setEditable] = useState(isPassword ? true : isEditable);
  const inputRef = useRef<TextInput>(null);

  function handleEditPress() {
    setEditable(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }

  function handleBlur() {
    if (!isPassword) {
      setEditable(false);
    }
  }

  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={scaled(24)} color={'#526471'} />
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="#526471"
        secureTextEntry={isPassword && !showPassword}
        editable={editable}
        selectTextOnFocus={editable}
        onBlur={handleBlur}
        {...rest}
      />
      {isPassword ? (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconRight}>
          <Ionicons
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={scaled(24)}
            color={'#526471'}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleEditPress} style={styles.iconRight}>
          <Ionicons
            name={'pencil-sharp'}
            size={scaled(24)}
            color={'#526471'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#526471',
    borderRadius: scaled(20),
    paddingHorizontal: scaled(10),
    paddingVertical: scaled(8),
    backgroundColor: '#ffffff',
    width: scaled(300),
    height: scaled(50),
    marginBottom: scaled(20),
    gap: scaled(15),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: scaled(2) },
    shadowOpacity: 0.4,
    shadowRadius: scaled(2),
    elevation: 3,
  },
  iconRight: {
    position: 'absolute',
    right: scaled(10),
  },
  input: {
    flex: 1,
    fontSize: scaled(18),
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    fontWeight: '800',
    marginLeft: scaled(-5),
    maxWidth: scaled(210),
  },
});
