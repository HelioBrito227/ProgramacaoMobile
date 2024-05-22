import React, { useEffect } from "react";
import { Image, SafeAreaView, TouchableOpacity } from "react-native";

import styles from "./style";
export default function NavBar({ navigation }){
    return(
        <SafeAreaView style = {styles.navbar}>
            <TouchableOpacity
            title = "Novo Projeto"
            onPress={() => navigation.navigate('NovoProjeto')}>
                <Image source={require('../../../assets/plus-circle.png')} style = {styles.imageStyle} />
            </TouchableOpacity>
            <TouchableOpacity
            title = "Meus Projetos"
            onPress={() => navigation.navigate('TelaInicial')}>
                <Image source={require('../../../assets/home-03.png')} style = {styles.imageStyle} />
            </TouchableOpacity>
            <TouchableOpacity
            title = "Cotações de Trabalho"
            onPress={() => navigation.navigate('Cotacoes')} >
                <Image source={require('../../../assets/ruler.png')} style = {styles.imageStyle} />
            </TouchableOpacity>
            <TouchableOpacity
            title = "Galeria de Imagens"
            onPress={() => navigation.navigate('Galeria')} >
                <Image source={require('../../../assets/image-03.png')} style = {styles.imageStyle} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}