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
            title = "Tela Inicial"
            onPress={() => navigation.navigate('TelaInicial')}>
                <Image source={require('../../../assets/home-03.png')} style = {styles.imageStyle} />
            </TouchableOpacity>
            <TouchableOpacity
            title = "Variáveis de Trabalho"
            onPress={() => navigation.navigate('Cotacao')} >
                <Image source={require('../../../assets/image-03.png')} style = {styles.imageStyle} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}