import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getProjeto, initDB, updateProjeto } from "../../dataBase/SQLiteManager";
import NavBar from "../NavBar";
import styles from "./style";

const formatarDataBrasil = () => {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();
    return `${dia}/${mes}/${ano}`
}

export default function Editar({navigation, route}){
    const projetoId= route.params.projetoId
    const [projeto, setProjeto] = useState([]);
    const [nomeCliente, setNomeCliente] = useState('')
    const [dataOrcamento, setDataOrcamento] = useState(formatarDataBrasil())
    const [custo, setCusto] = useState('')
    const [prazo, setPrazo] = useState('')
    const [custoFerro, setCustoFerro] = useState('')
    const [custoDiaTrabalho, setCustoDiaTrabalho] = useState('')

    const buscarProjeto = async() =>{
        try{
            const proj = await getProjeto(projetoId)
            setProjeto(proj)
        }catch (error) {
            console.log("Erro ao carregar Projeto: ", error)
        }
    }

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
        useCallback(()=>{
            buscarProjeto();
        },[])
    );
    
    const atualizarProjeto = async () => {
            if (!initDB) {
                console.log('banco de dados não inicializado!')
            } else {
                try {
                    await updateProjeto(
                        projeto.id,
                        !nomeCliente ? projeto.nome_cliente : nomeCliente,
                        !dataOrcamento ? projeto.data_orcamento : dataOrcamento,
                        !custo ? projeto.custo : custo ,
                        !prazo ? projeto.prazo : prazo
                    );
                    console.log("Projeto atualizado com sucesso!")
                    navigation.goBack();
                } catch (error) {
                    console.log('Erro ao atualizar Projeto: ', error)
                }
            }
    }

    return (
        <SafeAreaView style={styles.tela}>
            <View style={styles.blocoConteudo}>
            <Text style={styles.label}>Nome do Cliente:</Text>
                <TextInput
                placeholder={projeto.nome_cliente}
                style={styles.estiloInput}
                onChangeText={setNomeCliente}
                value={nomeCliente}
            />
                <Text style={styles.label}>Data de criação de orçamento:</Text>
                <TextInput
                 placeholder={projeto.dataOrcamento}
                onChangeText={setDataOrcamento}
                value={dataOrcamento}
                style={styles.estiloInput}
            />
                <Text style={styles.label}>Custo total de Orçamento: </Text>
                <TextInput
                 placeholder={ "R$" + projeto.custo}
                onChangeText={setCusto}
                value={custo}
                style={styles.estiloInput}
            />
                <Text style={styles.label}>Prazo para entrega de Obra : </Text>
                <TextInput
                placeholder={projeto.prazo + " dias"}
                onChangeText={setPrazo}
                value={prazo}
                style={styles.estiloInput}
            />
                <TouchableOpacity style={styles.botao} onPress={() => atualizarProjeto()}>
                    <Text style={styles.textoBotao}>Salvar</Text>
                </TouchableOpacity>
            </View>
            <View>
                <NavBar navigation={navigation} />
            </View>
        </SafeAreaView>

    )
}