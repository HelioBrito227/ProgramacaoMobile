import React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createNativeStackNavigator()

export default function Funcoes({navigation}){
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Cotação do Ferro"
                onPress={()=>navigation.navigate('Cotacao')}
            />
            <Button
                title="Calculo de Quantidade de Ferro"
                onPress={()=>navigation.navigate('Calculos')}
            />
        </View>
    )
}