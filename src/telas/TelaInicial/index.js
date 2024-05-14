import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity, View, ActivityIndicator, FlatList, SafeAreaView } from "react-native";
import { useFocusEffect } from '@react-navigation/native'
import { Card } from "react-native-elements";
import { getProjetos } from "../../dataBase/SQLiteManager";

export default function TelaInicial({ navigation }) {
    const [listasProjetos, setListasProjetos] = useState([])
    const [carregando, setCarregando] = useState(true)


    const carregarProjetos = async () => {
        try {
            setCarregando(true)
            let lista = await getProjetos();
            if (!Array.isArray(lista)) {
                lista = []
            }
            setListasProjetos(lista);
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

    const DadosProjetos = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { projetoId: item.id })}>
            <Card>
                <Card.Title>{item.nome_cliente}</Card.Title>
                <Text>Data de orçamento: {item.data_orcamento}</Text>
                <Card.Divider />
            </Card>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <DadosProjetos item={item}/> }
                    ItemSeparatorComponent = {()=><View />}
                    ListEmptyComponent={<Text>Nenhuma Projeto Encontrado</Text>}
                />
            )}
        </SafeAreaView>
    )
}