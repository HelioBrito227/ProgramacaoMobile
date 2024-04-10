import React, { useState } from "react";
import { Button, PixelRatio, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Funcoes({ navigation }) {
    const [preco, setPreco] = useState();
    const [area, setArea] = useState();

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('preco');
            if (value !== null) {
                setPreco(value);
            }
            const valor = await AsyncStorage.getItem('area');
            if (valor !== null) {
                setArea(valor);
            }
        } catch (e) {
            console.log(e)
        }
        console.log(preco, area)
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Variáveis de Cálculo"
                onPress={() => navigation.navigate('Cotacao')}
            />
            <Button
                title="Calculo de Quantidade de Ferro"
                onPress={() => {
                    getData(),
                    navigation.navigate('Calculos', {
                        preco: preco,
                        area: area
                    });
                }}
            />
        </View>
    )
}