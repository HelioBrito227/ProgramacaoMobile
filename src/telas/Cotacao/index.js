import React, { useCallback, useState } from "react";
import { View, Text, SafeAreaView, TextInput, Button, TouchableOpacity } from "react-native";
import styles from "./style";
import { initDB, getVariaveis, updateVariaveis, createVariaveis, obterUltimoId, getAllVariaveis, obterUltimoIdVariaveis } from "../../dataBase/SQLiteManager";
import { useFocusEffect } from "@react-navigation/native";

export default function Cotacao({ navigation }) {

    const [novoCustoFerro, setNovoCustoFerro] = useState('')
    const [novoCustoDiaTrabalho, setNovoCustoDiaTrabalho] = useState('')
    const [custoFerro, setCustoFerro] = useState('')
    const [custoDiaTrabalho, setCustoDiaTrabalho] = useState('')

    const carregarVariaveisSalvas = async () => {
        try {
            id = await obterUltimoIdVariaveis()
            dados = await getVariaveis(id)
            setCustoDiaTrabalho(dados[0].custo_dia_obra)
            setCustoFerro(dados[0].custo_ferro )          
        } catch (error) {
            console.log("Erro ao carregar Variaveis: ", error)
        }
    }
    
    useFocusEffect(
        useCallback(() => {
            carregarVariaveisSalvas();
        }, [])
    );

    const salvarDados = async () => {
        if (!initDB) {
            console.log('banco de dados não inicializado!')
        } else {
            try {
                await createVariaveis(novoCustoFerro, novoCustoDiaTrabalho);
                console.log("Variáveis inseridas com sucesso!")
                navigation.goBack();
            } catch (error) {
                console.log("Erro ao atualizar Variaveis: ", error)
            }
        }
    }

    return (
        <SafeAreaView>
            <Text> Cotação do Quilo do Ferro Salvo: {custoFerro}</Text>
            <View>
                <Text>Novo Valor do Quilo a ser Salvo:</Text>
                <TextInput style={styles.textInput}
                    keyboardType="decimal-pad"
                    onChangeText={setNovoCustoFerro}
                    value={novoCustoFerro}
                />
            </View>

            <Text> Valor do dia de Trabalho: {custoDiaTrabalho}</Text>
            <View>
                <Text>Novo Valor de Dia de Trabalho a ser Salvo:</Text>
                <TextInput style={styles.textInput}
                    keyboardType="decimal-pad"
                    onChangeText={setNovoCustoDiaTrabalho}
                    value={novoCustoDiaTrabalho}
                />
            </View>
            <TouchableOpacity onPress={() => salvarDados()}>
                <Text>Salvar Dados Inseridos</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}