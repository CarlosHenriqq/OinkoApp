import { Pressable, StyleSheet, Text } from "react-native";

interface InputCategoriaProps {
    title: string;
    width: number;
    isSelected: boolean;
    onPress: () => void;
    backgroundColorSelect: string;
    backgroundColorUnSelect: string;
    borderColorSelect: string;
    borderColorUnSelect: string;
    textUnselect: string;
}

const InputCategoria = ({
    title,
    width,
    isSelected,
    onPress,
    backgroundColorSelect,
    backgroundColorUnSelect,
    borderColorSelect,
    borderColorUnSelect,
    textUnselect,
}: InputCategoriaProps) => {
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.input,
                { width },
                isSelected
                    ? { backgroundColor: backgroundColorSelect, borderColor: borderColorSelect }
                    : { backgroundColor: backgroundColorUnSelect, borderColor: borderColorUnSelect }
            ]}
        >
            <Text style={{ color: isSelected ? '#ffffff' : textUnselect, fontFamily: 'Manrope', fontWeight: '800', fontSize: 18 }}>
                {title}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderWidth: 3,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 8,
        shadowColor: '#000000',         // cor da sombra
                shadowOffset: { width: 0, height: 2 },  // x e y do Figma
                shadowOpacity: 0.4,          // 10% = 0.1
                shadowRadius: 2,  
    },
});

export default InputCategoria;
