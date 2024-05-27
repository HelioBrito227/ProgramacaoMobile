import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { getProjeto } from "../../dataBase/SQLiteManager";
import NavBar from "../NavBar";
import styles from "./style";

export default function Detalhes({navigation, route}){
    const [projeto, setProjeto] = useState([]);
    const projetoId= route.params.projetoId

    const buscarProjeto = async() =>{
        try{
            const proj = await getProjeto(projetoId)
            setProjeto(proj)
        }catch (error) {
            console.log("Erro ao carregar Projeto: ", error)
        }
    }
    
    useFocusEffect(
        useCallback(()=>{
            buscarProjeto();
        },[])
    );

    return (
        <SafeAreaView style={styles.tela}>
            <View style={styles.blocoConteudo}>
                <Text style={styles.titulo}>{projeto.nome_cliente}</Text>
                <Text style={styles.label}>Data de criação de orçamento:</Text>
                <Text style={styles.conteudo}>{projeto.data_orcamento}</Text>
                <Text style={styles.label}>Custo total de Orçamento: </Text>
                <Text style={styles.conteudo}>R$ {projeto.custo}</Text>
                <Text style={styles.label}>Prazo para entrega de Obra : </Text>
                <Text style={styles.conteudo}>{projeto.prazo} dias</Text>
                <TouchableOpacity style={styles.botao}/* onPress={navigation.navigate('Editar', { projetoId: item.id })}*/>
                    <Text style={styles.textoBotao}>Editar</Text>
                </TouchableOpacity>
            </View>
            <View>
                <NavBar navigation={navigation} />
            </View>
        </SafeAreaView>

    )
}