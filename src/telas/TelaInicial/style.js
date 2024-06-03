import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    conteudoPrincipal:{
        backgroundColor: '#E7F1FF',
        height:"100%"
    },
    container:{
        flex:1,
        paddingLeft:20,
        paddingTop:20,
        backgroundColor: '#E7F1FF',
    },
    titulo:{
        fontSize:20,
        fontWeight:"600",
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
        fontSize:16,
    },
    imagem:{
        position:'absolute',
        alignSelf:'flex-end'
    },
    imagemTexto:{
        height:50,
        width:50
    }
})

export default styles;