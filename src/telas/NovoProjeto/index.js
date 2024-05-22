import React, { useCallback, useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createProjeto, getVariaveis, initDB, obterUltimoId, obterUltimoIdVariaveis } from "../../dataBase/SQLiteManager";
import { Button } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import NavBar from "../NavBar";

const formatarDataBrasil = () => {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();
    return `${dia}/${mes}/${ano}`
}

export default function NovoProjeto({ navigation }) {
    const [nomeCliente, setNomeCliente] = useState('')
    const [dataOrcamento, setDataOrcamento] = useState(formatarDataBrasil())
    const [custo, setCusto] = useState('')
    const [prazo, setPrazo] = useState('')
    const [custoFerro, setCustoFerro] = useState('')
    const [custoDiaTrabalho, setCustoDiaTrabalho] = useState('')

    const gerarOrcamento = (prazo) => {
        setPrazo(prazo)
        let custoObra = parseFloat(custoDiaTrabalho) * parseFloat(prazo);
        setCusto(custoObra)
    }

    const exibirCusto = ()=>{
        if(isNaN(custo)){
            return <Text> </Text>
        }else{
           return <Text>{custo}</Text>
        }
    }
    const salvarProjeto = async () => {
        if (!initDB) {
            console.log('banco de dados não inicializado!')
        } else {
            try {
                await createProjeto(nomeCliente, dataOrcamento, custo, prazo);
                console.log("Projeto criado com sucesso!")
                navigation.goBack();
            } catch (error) {
                console.log('Erro ao salvar Projeto: ', error)
            }
        }
    }
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

    return (
        <SafeAreaView>
            <Text>Nome do Cliente</Text>
            <TextInput
                onChangeText={setNomeCliente}
                value={nomeCliente}
            />
            <Text>Data de Orçamento</Text>
            <TextInput
                onChangeText={setDataOrcamento}
                value={dataOrcamento}
            />
            <Text>Prazo de entrega</Text>
            <TextInput
                onChangeText={(prazo) => gerarOrcamento(prazo)}
                keyboardType="numeric"
                value={prazo}
            />
            <Text>Custo de Dia de Trabalho {custoDiaTrabalho}</Text>
            <Text>Custo de Quilo do Ferro {custoFerro}</Text>
            <Text>Custo de Orçamento {exibirCusto()}</Text>
            <Button title="Salvar Projeto" onPress={() => salvarProjeto()} />
            <NavBar navigation={navigation}/>
        </SafeAreaView>
    )
}