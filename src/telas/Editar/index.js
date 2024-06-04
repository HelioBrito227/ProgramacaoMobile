import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState, useEffect } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getProjeto, getVariaveis, initDB, obterUltimoIdVariaveis, updateProjeto } from "../../dataBase/SQLiteManager";
import NavBar from "../NavBar";
import styles from "./style";

const formatarDataBrasil = () => {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();
    return `${dia}/${mes}/${ano}`
}

export default function Editar({ navigation, route }) {
    const projetoId = route.params.projetoId
    const [projeto, setProjeto] = useState([]);
    const [nomeCliente, setNomeCliente] = useState('')
    const [dataOrcamento, setDataOrcamento] = useState(formatarDataBrasil())
    const [custo, setCusto] = useState('')
    const [prazo, setPrazo] = useState('')
    const [custoFerro, setCustoFerro] = useState('')
    const [custoDiaTrabalho, setCustoDiaTrabalho] = useState('')
    const [novoCustoDiaTrabalho, setNovoCustoDiaTrabalho] = useState('')

    const buscarProjeto = async () => {
        try {
            const proj = await getProjeto(projetoId)
            setProjeto(proj)
        } catch (error) {
            console.log("Erro ao carregar Projeto: ", error)
        }
    }

    const exibirCusto = () => {
        let custoTotal
        !custo ? custoTotal = projeto.custo : custoTotal = custo
        if (isNaN(custoTotal)) {
            return <Text> </Text>
        } else {
            return <Text>{custoTotal}</Text>
        }
    }

    const carregarVariaveisSalvas = async () => {
        try {
            id = await obterUltimoIdVariaveis()
            dados = await getVariaveis(id)
            setCustoDiaTrabalho(dados[0].custo_dia_obra)
        } catch (error) {
            console.log("Erro ao carregar Variaveis: ", error)
        }
    }

    useFocusEffect(
        useCallback(() => {
            buscarProjeto();
            carregarVariaveisSalvas();
        }, [])
    );

    useEffect(() => {
        let prazoAtual = prazo || projeto.prazo;
        let custoObra = novoCustoDiaTrabalho || custoDiaTrabalho;

        // Verifique se prazoAtual e custoObra são números
        if (!isNaN(prazoAtual) && !isNaN(custoObra)) {
            let custoTotal = parseFloat(prazoAtual) * parseFloat(custoObra);
            setCusto(custoTotal);
        }
    }, [prazo, novoCustoDiaTrabalho]);

    const atualizarProjeto = async () => {
        if (!initDB) {
            console.log('banco de dados não inicializado!')
        } else {
            try {
                console.log("custo " + custo, " prazo " + prazo)

                await updateProjeto(
                    projeto.id,
                    !nomeCliente ? projeto.nome_cliente : nomeCliente,
                    !dataOrcamento ? projeto.data_orcamento : dataOrcamento,
                    !custo ? projeto.custo : custo,
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
                <Text style={styles.variavel}>{dataOrcamento}</Text>
                <Text style={styles.label}>Valor do dia de Trabalho Mais Recente:</Text>
                <Text style={styles.variavel}>{custoDiaTrabalho}</Text>
                <Text style={styles.label}>Novo Valor de Dia de Trabalho a ser Utilizado:</Text>
                <TextInput style={styles.estiloInput}
                    keyboardType="decimal-pad"
                    onChangeText={setNovoCustoDiaTrabalho}
                    value={novoCustoDiaTrabalho}
                />
                <Text style={styles.label}>Prazo para entrega de Obra : </Text>
                <TextInput
                    placeholder={projeto.prazo + " dias"}
                    onChangeText={setPrazo}
                    keyboardType="decimal-pad"
                    value={prazo}
                    style={styles.estiloInput}
                />
                <Text style={styles.label}>Custo total de Orçamento: </Text>
                <Text style={styles.conteudo}>R${exibirCusto()}</Text>
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