import React, { useCallback, useState } from "react";
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createProjeto, getVariavel, initDB, obterUltimoIdVariaveis } from "../../dataBase/SQLiteManager";
import { useFocusEffect } from "@react-navigation/native";
import NavBar from "../NavBar";
import styles from "./style";

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

    const alerta = () =>{  
        Alert.alert('Falta de Variável','Redirecionando para a tela de cadastro de variável de trabalho',[
            {
                text:"Ok",
                onPress:()=> navigation.navigate('Cotacoes')
            }
        ]);
        
    };

    const carregarVariaveisSalvas = async () => {
        try {
            id = await obterUltimoIdVariaveis()
            dados = await getVariavel(id)
            setCustoDiaTrabalho(dados[0].custo_dia_obra)        
        } catch (error) {
            console.log("Erro ao carregar Variaveis: ", error)
            if(error === "Nenhum ID encontrado"){
               alerta();
            }
        }
    }

    useFocusEffect(
        useCallback(() => {
            carregarVariaveisSalvas();
        }, [])
    );

    return (
        <SafeAreaView style={styles.conteudoPrincipal}>
            <View style={styles.container} > 
            <Text style={styles.estiloTexto}>Nome do Cliente</Text>
            <TextInput
                style={styles.estiloInput}
                onChangeText={setNomeCliente}
                value={nomeCliente}
            />
            <Text style={styles.estiloTexto}>Data de Orçamento</Text>
            <Text
                onChangeText={setDataOrcamento}
                value={dataOrcamento}
                style={styles.estiloVariavel}
            >{dataOrcamento}</Text>
            <Text style={styles.estiloTexto}>Prazo de entrega</Text>
            <TextInput
            style={styles.estiloInput}
                onChangeText={(prazo) => gerarOrcamento(prazo)}
                keyboardType="numeric"
                value={prazo}
            />
            <Text style={styles.estiloTexto}>Custo de Dia de Trabalho </Text>
            <Text style={styles.estiloVariavel}>R$ {custoDiaTrabalho}</Text>
            <Text style={styles.estiloTexto}>Custo de Orçamento </Text>
            <Text style={styles.estiloVariavel}>R$ {exibirCusto()}</Text>
            <TouchableOpacity style={styles.botao} title="Salvar" onPress={() => salvarProjeto()}>
            <Text style={styles.textoBotao}>Salvar</Text>
            </TouchableOpacity>
            </View>
            
            <NavBar navigation={navigation}/>
        </SafeAreaView>
    )
}