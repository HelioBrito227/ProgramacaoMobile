import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    conteudoPrincipal:{
        flex:1,
        height:"100%",
        backgroundColor:'#E7F1FF'
    },
    container:{
        flex:1,
        paddingLeft:20,
        paddingTop:20
    },
    titulo:{
        fontSize:20,
        fontWeight:"600",
    },
    label:{
       fontSize:16,
       fontWeight:"500",
       color:"#747C8A",
       paddingTop:10,
    },
    conteudo:{
        height:45,
        fontSize:15,
        fontWeight:"400"
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

export default styles