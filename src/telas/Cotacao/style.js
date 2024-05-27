import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    conteudoPrincipal:{
        backgroundColor: '#E7F1FF',
        height:"100%"
    },
    container:{
        flex:1,
        paddingLeft:20,
        paddingTop:20
    },
    variavel:{
        fontSize:15,
        fontWeight:"500",
        color:"#747C8A",
     },
     label:{
        paddingTop:10,
        fontSize:16,   
    },
    textInput:{
        backgroundColor:"#FFFFFF",
        height:35,
        width:320,
        borderRadius:10,
        fontSize:15
    },
    botao:{
        marginTop:15,
        backgroundColor:"#0551B3",
        height:30,
        width:65,
        borderRadius:5,
        alignItems:"center",
        justifyContent:"center",
        marginLeft:250
    },
    textoBotao:{
        fontSize:16,
        color:"#FFFFFF",
    }
})

export default styles;