import React from "react";
import { View, Text, SafeAreaView, TextInput} from "react-native";
import styles from "./style";

export default function Cotacao(navigation) {
    function valorFerro(valor){
        let preco = valor
    }

    return (
        <SafeAreaView>
            <Text> Cotação do Ferro no dia:</Text>
            <TextInput style={styles.textInput}
                placeholder="Preço"
                keyboardType="decimal-pad"
                onSubmitEditing={valorFerro()}
                />
        </SafeAreaView>
    )
}