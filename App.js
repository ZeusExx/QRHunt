import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Telas/Login/login';
import Cadastro from './Telas/Cadastro/cadastro';
import Inicio from './Telas/Inicio/inicio';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} // Oculta o cabeçalho da tela de Login
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ headerShown: false }} // Oculta o cabeçalho da tela de Cadastro
        />
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{ headerShown: false }} // Oculta o cabeçalho da tela de Início
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
