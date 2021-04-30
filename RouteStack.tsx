import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from './reducks/store/type';
import { listenAuthState } from './reducks/user/operation';
import { Home, Reset, SignIn, SignUp } from './templates';
const Stack = createStackNavigator();
const TabStack = createMaterialTopTabNavigator();
export const RootStack = () => {
    const selector = useSelector((state: State) => state.users);
    const isSignedIn = selector.isSignedIn;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!isSignedIn) {
            dispatch(listenAuthState())
        }
    }, []);

    return (
        <>
            {isSignedIn ? (
                <TabStack.Navigator>
                    <Stack.Screen name="Home" component={Home} />
                </TabStack.Navigator>
            ) : (
                <Stack.Navigator
                    initialRouteName="SignIn"
                >
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="Reset" component={Reset} />
                </Stack.Navigator>
            )}
        </>
    );
};
export type SignUpNavigationProp = StackNavigationProp<StackParamList, 'SignUp'>;
export type SignInNavigationProp = StackNavigationProp<StackParamList, 'SignIn'>;
export type HomeNavigationProp = StackNavigationProp<StackParamList, 'Home'>;
export type ResetNavigationProp = StackNavigationProp<StackParamList, 'Reset'>;
type StackParamList = {
    Home: undefined;
    SignIn: undefined;
    SignUp: undefined;
    Reset: undefined;
};