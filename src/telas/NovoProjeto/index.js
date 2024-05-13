import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { createProjeto, initDB, obterUltimoId } from "../../dataBase/SQLiteManager";
import { Button } from "react-native-elements";

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

    const custoDeProjeto = () => {
        custoObra = prazo * custoDiaTrabalho;
        setCusto(custoObra)
        return custoObra
    }
    const salvarProjeto = async () => {
        if (!initDB) {
            console.log('banco de dados não inicializado!')
        } else {
            try {
                await createProjeto(nomeCliente, dataOrcamento, custo, prazo);
                const projeto_id = await obterUltimoId();
                navigation.goBack();
            } catch (error) {
                console.log('Erro ao salvar Projeto: ', error)
            }
        }
    }

    return (
        <View>
            <TextInput
                placeholder="Nome do Cliente"
                onChangeText={setNomeCliente}
                value={nomeCliente}
            />
            <TextInput
                placeholder="Data"
                onChangeText={setDataOrcamento}
                value={dataOrcamento}
            />
            <TextInput
                placeholder="Prazo"
                onChangeText={setPrazo}
                value={prazo}
            />
            <TextInput
                placeholder="Custo de Orçamento"
                onChangeText={() => custoDeProjeto()}
            />
            <Text>Custo de Dia de Trabalho {custoDiaTrabalho}</Text>
            <Text>Custo de Quilo do Ferro {custoFerro}</Text>
            <Button title="Salvar Projeto" onPress={salvarProjeto} />
        </View>
    )
}