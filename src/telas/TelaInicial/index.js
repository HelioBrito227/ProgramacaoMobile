import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity, View, ActivityIndicator, FlatList } from "react-native";
import { useFocusEffect } from '@react-navigation/native'
import { Card } from "react-native-elements";
import { getProjeto } from "../../dataBase/SQLiteManager";

export default function TelaInicial({ navigation }) {
    const [listasProjetos, setListasProjetos] = useState([])
    const [carregando, setCarregando] = useState(true)


    const carregarProjetos = async () => {
        try {
            setCarregando(true)
            let projetos = await getProjeto();
            if (!Array.isArray(projetos)) {
                projetos = []
            }
            setListasProjetos(projetos);
        } catch (error) {
            console.log('Erro ao carregar projetos: ', error)
        } finally {
            setCarregando(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            setTimeout(() => {
                carregarProjetos();
            }, 2000);
        }, [])
    );

    const DadosProjetos = (projeto) => (
        <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { projetoId: projeto.id })}>
            <Card.Title>{projeto.nome_cliente}</Card.Title>
            <Card.Divider />
            <Text>Data de orçamento: {projeto.data_orcamento}</Text>
        </TouchableOpacity>
    );


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
                title="Novo Projeto"
                onPress={() => navigation.navigate('NovoProjeto')}>
                <Text>Criar Novo Projeto</Text>
            </TouchableOpacity>
            <TouchableOpacity
                title="Alterar variaveis"
                onPress={()=> navigation.navigate('Cotacao')}>
                    <Text>Alterar Variaveis de Trabalho</Text>
            </TouchableOpacity>
            {carregando? (
                <ActivityIndicator size="large" color="0000FF" />
            ):(
                <FlatList
                    data = {listasProjetos}
                    showsVerticalScrollIndicator={true} 
                    keyExtractor={(projeto) => projeto.id}
                    renderItem={({projeto})=> <DadosProjetos item={projeto}/> }
                    ListEmptyComponent={<Text>Nenhuma Projeto Encontrado</Text>}
                />
            )}
        </View>
    )
}