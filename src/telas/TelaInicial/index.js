import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity, View, ActivityIndicator, FlatList, SafeAreaView, Image } from "react-native";
import { useFocusEffect } from '@react-navigation/native'
import styles from "./style";
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
            <Card containerStyle={styles.estiloCard}>
                <Card.Title style={styles.estiloCardTitulo}>{item.nome_cliente}</Card.Title>
                <Text style={styles.estiloCardTexto}>{item.data_orcamento}</Text>
                <Image source={require('../../../assets/pencil-01.jpg')} />       
            </Card>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.conteudoPrincipal}>
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
                    style={styles.estiloFlatList}
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