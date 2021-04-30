import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from './reducks/store/type';
import { listenAuthState } from './reducks/user/operation';
import { Home, SignIn, SignUp } from './templates';
const Stack = createStackNavigator();

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
        <Stack.Navigator
            initialRouteName="SignIn"
        >
            {isSignedIn ? (
                <>
                    <Stack.Screen name="Home" component={Home} />
                </>
            ) : (
                <>
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                </>
            )}
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