import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    title: string,

}

export  function Button ({title, ...rest}){
    return (
        <TouchableOpacity style={styles.button}{...rest}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        width:200,
        height:40,
        backgroundColor:'#7a8c99',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        shadowColor: '#7a8c99',         // cor da sombra
shadowOffset: { width: 0, height: 3 },  // x e y do Figma
shadowOpacity: 0.60,          // 10% = 0.1
shadowRadius: 2,  
    
    },
    text:{
        color:'#ffffff',
        fontFamily:'Manrope',
         fontSize:18, 
         textAlign:'center', 
         fontWeight:800
    }
})