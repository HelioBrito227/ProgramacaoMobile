import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Cotacao from "./src/telas/Cotacao";
import Calculos from "./src/telas/Calculos";
import Funcoes from "./src/telas/Funcoes";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
      initialRoute 
      Name="Funcoes" 
      screenOptions={{
        headerTitleAlign: "center"
      }}>
        <Stack.Screen name = "Funcoes" component = {Funcoes} options={{title: 'Funções do Aplicativo'}}/>
        <Stack.Screen name = "Cotacao" component = {Cotacao} options={{title: 'Cotação do Ferro'}}/>
        <Stack.Screen name = "Calculos" component = {Calculos} options={{title: 'Cálculos de Total de Ferro'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}