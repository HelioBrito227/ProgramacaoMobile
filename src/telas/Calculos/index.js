import React, { useState } from "react";
import { Text, View } from "react-native";


export default function Calculos({ navigation, route }) {
    const [preco, setPreco] = useState(route.params.preco);
    const [area, setArea] = useState(route.params.area);

    return (
        <View>
            <Text>Página de Cálculos</Text>
            <Text>Preço do Quilo do Ferro</Text>
            <Text>{preco}</Text>
            <Text>Área Total da Obra</Text>
            <Text>{area}</Text>
        </View>
    )
}