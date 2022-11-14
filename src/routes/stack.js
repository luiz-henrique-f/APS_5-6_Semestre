import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Nivel1 from '../pages/Nivel1';
import Nivel2 from '../pages/Nivel2';
import Nivel3 from '../pages/Nivel3';

const Stack = createStackNavigator();

export default function Routes(){
    return (
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                cardStyle: {backgroundColor:'#fff'}
            }}
            >
                <Stack.Screen name='Nivel1' component={Nivel1}/>
                <Stack.Screen name='Nivel2' component={Nivel2}/>
                <Stack.Screen name='Nivel3' component={Nivel3}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}