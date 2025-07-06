import { Pressable, StyleSheet, Text } from "react-native";

interface InputCategoriaProps {
    title: string;
    width: number;
    isSelected: boolean;
    onPress: () => void;
}

export default function InputCategoria({ title, width, isSelected, onPress }: InputCategoriaProps) {
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.input,
                { width },
                { backgroundColor: isSelected ? '#A3C0AC' : '#ffffff' },
                { borderColor: isSelected ? '#7A8C99' : '#A3C0AC' },
            ]}
        >
            <Text style={{ color: isSelected ? '#ffffff' : '#A3C0AC', fontFamily: 'Manrope', fontWeight: '700', fontSize: 16 }}>
                {title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderWidth: 2,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 8,
    },
});
