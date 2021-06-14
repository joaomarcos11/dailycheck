import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStackRoutes from './stack.routes';


const Routes = () => (
    <NavigationContainer>
        <AppStackRoutes />
    </NavigationContainer>
);

export default Routes;

// Notes
// Acredito que usou nesse formato pois já retornou diretamente
// com return, às usam outra funções dentro da função do componente