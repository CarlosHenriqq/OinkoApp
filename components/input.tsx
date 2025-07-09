import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

interface InputProps extends TextInputProps {
    placeholder: string;
    icon: keyof typeof Ionicons.glyphMap;
     isPassword?: boolean;
}

export default function Input({ placeholder, icon, isPassword, ...rest }: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View style={styles.container}>
            <Ionicons name={icon} size={24} color={'#A3C0AC'}/>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                placeholderTextColor="#A3C0AC"
                 secureTextEntry={isPassword && !showPassword}
                {...rest}
            />
            {isPassword && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconRight}>
                    <Ionicons
                        name={showPassword ?'eye-outline' : 'eye-off-outline'}
                        size={24}
                        color={'#A3C0AC'}
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#A3C0AC',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#ffffff',
        width:300,
        height:50,
        marginBottom:20,
        gap:15,
        shadowColor: '#000000',         // cor da sombra
                shadowOffset: { width: 0, height: 2 },  // x e y do Figma
                shadowOpacity: 0.4,          // 10% = 0.1
                shadowRadius: 2,  
    
    },
    icon: {
        marginLeft: 20,
    },
    iconRight: {
        position: 'absolute',
        right: 20,
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: '#4A4A4A',
        fontFamily: 'Manrope',
        fontWeight:800
       
        
    }
});
