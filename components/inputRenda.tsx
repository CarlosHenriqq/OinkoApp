import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

interface InputProps extends TextInputProps {
  placeholder: string;
  icon: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
  isEditable?: boolean; // campos comuns: bloqueia, libera com lápis
}

export default function InputRenda({ placeholder, icon, isPassword, isEditable = false, ...rest }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [editable, setEditable] = useState(isPassword ? true : isEditable); // senha = sempre editável
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
      <Ionicons name={icon} size={24} color={'#526471'} />
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
            size={24}
            color={'#526471'}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleEditPress} style={styles.iconRight}>
          <Ionicons
            name={'pencil-sharp'}
            size={24}
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
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    width: 300,
    height: 50,
    marginBottom: 20,
    gap: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
  },
  iconRight: {
    position: 'absolute',
    right: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    fontWeight: '800',
    marginLeft: -5,
    maxWidth: 210,
  },
});
