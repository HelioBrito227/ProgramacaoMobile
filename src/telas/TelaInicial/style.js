import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    conteudoPrincipal:{
        backgroundColor: '#E7F1FF',
        height:"100%"
    },
    estiloFlatList:{
        flex:1,
        paddingBottom: 15,
    },
    estiloCard:{
        flex:1,
        //width:'100%',
        justifyContent:'left',
        alignItems: 'left',
        borderRadius: 15,
        marginBottom:20      
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