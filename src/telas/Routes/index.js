import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { initDB } from "../../dataBase/SQLiteManager";

import TelaInicial from "../TelaInicial";
import Detalhes from "../Detalhes";
import NovoProjeto from "../NovoProjeto";
import Cotacao from "../Cotacao";
import Galeria from "../Galeria";
import Editar from "../Editar";


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
          headerTitleAlign: "center",
          headerStyle:{backgroundColor: '#E7F1FF'}
        }}>
        <Stack.Screen name="TelaInicial" component={TelaInicial} options={{ title: 'Meus Projetos' }} />
        <Stack.Screen name="Detalhes" component={Detalhes} options={{ title: 'Detalhes' }} />
        <Stack.Screen name="NovoProjeto" component={NovoProjeto} options={{ title: 'Novo Projeto' }} />
        <Stack.Screen name="Cotacoes" component={Cotacao} options={{ title: 'Cotações de Trabalho'}}/>
        <Stack.Screen name="Galeria" component={Galeria} options={{ title: 'Galeria' }} />
        <Stack.Screen name="Editar" component={Editar} options={{ title:'Editar'}} />
      </Stack.Navigator>
    </NavigationContainer>
    );
}
