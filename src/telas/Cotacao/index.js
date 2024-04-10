import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, Button } from "react-native";
import styles from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cotacao({ navigation }) {

    const [preco, setPreco] = useState('');
    const [area, setArea] = useState('');


    getMultiple = async () => {
        let values
        try {
            values = await AsyncStorage.multiGet(['preco', 'area'])
            setPreco(values[0][1])
            setArea(values[1][1])
        } catch (e) {
            console.log(e)
        }
        console.log(values)

    }


    multiSet = async () => {
        const firstPair = ["preco", preco]
        const secondPair = ["area", area]
        try {
            await AsyncStorage.multiSet([firstPair, secondPair])
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <SafeAreaView>
            <Text> Cotação do Ferro no dia:</Text>
            <TextInput style={styles.textInput}
                placeholder="Preço"
                keyboardType="decimal-pad"
                onChangeText={setPreco}
                value={preco}
            />

            <Text> Área em metros de fundação</Text>
            <TextInput style={styles.textInput}
                placeholder="Área total"
                keyboardType="decimal-pad"
                onChangeText={setArea}
                value={area}
            />
            <Button
                title="Utilizar variáveis"
                onPress={() => {
                    multiSet(),
                    navigation.navigate('Calculos', {
                        preco: preco,
                        area: area

                    });
                }}
            />
        </SafeAreaView>
    )
}