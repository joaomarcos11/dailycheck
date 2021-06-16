import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { EmotionSelect } from '../pages/EmotionSelect';
import { ActivitySelect } from '../pages/ActivitySelect';

import colors from '../styles/colors';

const stackRoutes = createStackNavigator();

const AppStackRoutes: React.FC = () => {
    return(
        <stackRoutes.Navigator
            headerMode="none"
            screenOptions={{
                cardStyle: {
                    backgroundColor: colors.white
                }
            }}
        >
            <stackRoutes.Screen 
                name="Welcome"
                component={Welcome}
            />

            <stackRoutes.Screen 
                name="UserIdentification"
                component={UserIdentification}
            />

            <stackRoutes.Screen 
                name="Confirmation"
                component={Confirmation}
            />

            <stackRoutes.Screen 
                name="EmotionSelect"
                component={EmotionSelect}
            />

            <stackRoutes.Screen 
                name="ActivitySelect"
                component={ActivitySelect}
            />

        </stackRoutes.Navigator>
    );
}

export default AppStackRoutes;