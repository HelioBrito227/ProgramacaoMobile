import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { getProjeto } from "../../dataBase/SQLiteManager";

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

    return(
        <SafeAreaView>
            <Text>Cliente: {projeto.nome_cliente}</Text>
            <Text>Data de criação de orçamento: {projeto.data_orcamento}</Text>
            <Text>Custo total de Orçamento: {projeto.custo}</Text>
            <Text>Prazo para entrega de Obra : {projeto.prazo} dias</Text>
        </SafeAreaView>
    )
}