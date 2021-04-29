import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Home, SignIn, SignUp } from './templates';
const Stack = createStackNavigator();

export const RootStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="SignIn"　//最初の画面
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#265366",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
};
export type SignUpNavigationProp = StackNavigationProp<StackParamList, 'SignUp'>;
export type SignInNavigationProp = StackNavigationProp<StackParamList, 'SignIn'>;
export type HomeNavigationProp = StackNavigationProp<StackParamList, 'Home'>;
type StackParamList = {
    Home: undefined;
    SignIn: undefined;
    SignUp: undefined;
};