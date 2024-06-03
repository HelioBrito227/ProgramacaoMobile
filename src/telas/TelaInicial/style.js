import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    conteudoPrincipal:{
        backgroundColor: '#E7F1FF',
        height:"100%"
    },
    estiloCard:{
        flex:1,
        justifyContent:'left',
        alignItems: 'left',
        borderRadius: 10,  
    },
    estiloCardTitulo:{
        fontSize:18,
        fontWeight:'bold'
    },
    estiloCardTexto:{
        fontSize:14,
    },
    imagem:{
        position:'absolute',
        alignSelf:'flex-end'
    }
})

export default styles;