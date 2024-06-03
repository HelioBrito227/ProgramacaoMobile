import React, { useCallback, useState } from "react";
import { View, Text, SafeAreaView, TextInput, Button, TouchableOpacity } from "react-native";
import styles from "./style";
import { initDB, getVariaveis, updateVariaveis, createVariaveis, obterUltimoId, getAllVariaveis, obterUltimoIdVariaveis } from "../../dataBase/SQLiteManager";
import { useFocusEffect } from "@react-navigation/native";
import NavBar from "../NavBar";

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
            setCustoFerro(dados[0].custo_ferro)
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
        <SafeAreaView style={styles.conteudoPrincipal}>
            <View style={styles.container}>
                <Text style={styles.label}>Valor do dia de Trabalho</Text>
                <Text style={styles.variavel}>{!custoDiaTrabalho? "Não há custo de dia de Trabalho Salvo": custoDiaTrabalho}</Text>
                <Text style={styles.label}>Novo Valor de Dia de Trabalho a ser Salvo</Text>
                <TextInput style={styles.textInput}
                    keyboardType="decimal-pad"
                    onChangeText={setNovoCustoDiaTrabalho}
                    value={novoCustoDiaTrabalho}
                />
                <TouchableOpacity style={styles.botao} onPress={() => salvarDados()}>
                    <Text style={styles.textoBotao}>Salvar</Text>
                </TouchableOpacity>
            </View>
            <NavBar navigation={navigation} />
        </SafeAreaView>
    )
}