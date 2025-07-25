import { Dimensions, Pressable, StyleSheet, Text } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BASE_WIDTH = 390;
const scale = SCREEN_WIDTH / BASE_WIDTH;
const scaled = (size: number) => size * scale;

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
            <Text style={{
                color: isSelected ? '#ffffff' : textUnselect,
                fontFamily: 'Manrope',
                fontWeight: '800',
                fontSize: scaled(18)
            }}>
                {title}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    input: {
        height: scaled(30),
        borderWidth: 3,
        borderRadius: scaled(20),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scaled(10),
        marginBottom: scaled(8),
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: scaled(2) },
        shadowOpacity: 0.4,
        shadowRadius: scaled(2),
        elevation: 3,
    },
});

export default InputCategoria;
