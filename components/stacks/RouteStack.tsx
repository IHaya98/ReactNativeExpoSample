import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../reducks/store/type';
import { listenAuthState } from '../../reducks/user/operation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import SignInStack from './SignInStack';
import AweIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SignOut } from '../../templates';
import { Loading } from '../ui-kit';
const Drawer = createDrawerNavigator();

export const RouteStack = () => {
    const selector = useSelector((state: State) => state.users);
    const isSignedIn = selector.isSignedIn;
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!isSignedIn) {
            dispatch(listenAuthState())
            setTimeout(()=>{
                setLoading(false)
            },1000)
        }
    }, []);

    return (
        <>
            <Drawer.Navigator
                drawerContentOptions={{
                    activeTintColor: '#e91e63',
                    itemStyle: { marginVertical: 5 },
                }}>
                {isSignedIn ? (
                    <>
                        <Drawer.Screen name="HomeStack" options={{
                            drawerLabel: 'ホーム', drawerIcon: ({ focused, color, size }) => (
                                <AweIcon name="home" size={size} color={color} />
                            )
                        }} component={HomeStack} />
                        <Drawer.Screen name="SignOut" options={{
                            drawerLabel: 'サインアウト', drawerIcon: ({ focused, color, size }) => (
                                <MaterialIcon name="logout" size={size} color={color} />
                            )
                        }} component={SignOut} />
                    </>
                ) : loading ? (
                    <Drawer.Screen name="Loading" component={Loading} />
                ) : (
                    <>
                        <Drawer.Screen name="SignInStack" options={{
                            drawerLabel: 'サインイン', drawerIcon: ({ focused, color, size }) => (
                                <MaterialIcon name="login" size={size} color={color} />
                            )
                        }} component={SignInStack} />
                    </>
                )}
            </Drawer.Navigator>
        </>
    );
};