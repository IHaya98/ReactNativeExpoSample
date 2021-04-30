import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from './reducks/store/type';
import { listenAuthState } from './reducks/user/operation';
import { Home, Reset, SignIn, SignUp, UserProfile } from './templates';
import { TouchableOpacity ,Text} from 'react-native';
//import Header from './components/Header/Header';

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
    const Header = () => {
        return (
            <TouchableOpacity onPress={() => alert('headerTitle Tapped')}>
                <Text>Title Component</Text>
            </TouchableOpacity>
        );
    };

    return (
        <>
            {isSignedIn ? (
                <>
                <TabStack.Navigator>
                    <TabStack.Screen name="Home" component={Home} />
                    <TabStack.Screen name="UserProfile" component={UserProfile} />
                </TabStack.Navigator>
                </>
            ) : (
                <Stack.Navigator
                    initialRouteName="SignIn"
                    screenOptions={{headerTitle: Header}}
                >
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="Reset" component={Reset} />
                </Stack.Navigator>
            )}
        </>
    );
};