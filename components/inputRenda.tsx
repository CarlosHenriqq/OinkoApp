import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

interface InputProps extends TextInputProps {
    placeholder: string;
    icon: keyof typeof Ionicons.glyphMap;
     isPassword?: boolean;
     isEditable?: boolean;
}

export default function InputRenda({ placeholder, icon, isPassword, isEditable, ...rest }: InputProps) {
    return (
        <View style={styles.container}>
            <Ionicons name={icon} size={24} color={'#526471'}/>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                placeholderTextColor="#526471"
                {...rest}
            />
        
            {isEditable && (
                <TouchableOpacity style={styles.iconRight}>
                    <Ionicons
                        name={'pencil-sharp'}
                        size={24}
                        color={'#526471'}
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
        borderColor: '#526471',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#ffffff',
        width:300,
        height:50,
        marginBottom:20,
        gap:15
    
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
        color: '#7a8c99',
        fontFamily: 'Manrope',
        fontWeight:800
       
        
    }
});
