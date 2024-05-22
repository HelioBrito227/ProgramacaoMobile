import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import { initDB } from "../../dataBase/SQLiteManager";

import TelaInicial from "../TelaInicial";
import Detalhes from "../Detalhes";
import NovoProjeto from "../NovoProjeto";
import Cotacao from "../Cotacao";


export default function Routes() {
    const Stack = createNativeStackNavigator();
    
    useEffect(()=> {
        initDB();
        console.log("Banco de dados inicializado com sucesso")
    },[])

    return(
    <NavigationContainer>
      <Stack.Navigator
        initialRoute
        Name="Home"
        screenOptions={{
          headerTitleAlign: "center"
        }}>
        <Stack.Screen name="TelaInicial" component={TelaInicial} options={{ title: 'Lista de Projetos' }} />
        <Stack.Screen name="Detalhes" component={Detalhes} options={{ title: 'Detalhamento de Projeto' }} />
        <Stack.Screen name="NovoProjeto" component={NovoProjeto} options={{ title: 'Cadastro de Novo Projeto' }} />
        <Stack.Screen name="Cotacao" component={Cotacao} options={{ title: 'Cotações Atuais'}}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
}
