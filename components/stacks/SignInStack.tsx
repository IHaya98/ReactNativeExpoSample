import 'react-native-gesture-handler';

import * as React from 'react';
import {
    useNavigation,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationDrawerStructure from './NavigationDrawerStructure';
import { Reset, SignIn, SignUp } from '../../templates';

const Stack = createStackNavigator();

const SignInStack = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator
            initialRouteName="SignIn"
            screenOptions={{
                headerLeft: () => (
                    <NavigationDrawerStructure navigationProps={navigation} />
                ),
                headerStyle: {
                    backgroundColor: '#000000', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
            }}>
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                    title: 'サインイン', //Set Header Title
                }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    title: '新規登録', //Set Header Title
                }}
            />
            <Stack.Screen
                name="Reset"
                component={Reset}
                options={{
                    title: 'パスワードのリセット', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
};

export default SignInStack;