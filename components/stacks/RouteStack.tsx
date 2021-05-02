import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../reducks/store/type';
import { listenAuthState, signOut } from '../../reducks/user/operation';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import SignInStack from './SignInStack';
import AweIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Drawer = createDrawerNavigator();

const LogoutComponent = (props: any) => {
    const navigation = props.navigation;
    const dispatch = useDispatch();
    return (
        <DrawerContentScrollView {...props}>Î
            <DrawerItemList {...props} />
            <DrawerItem label="サインアウト"
                icon={({ focused, color, size }) => (<Icon name="logout" size={size} color={color} />)}
                onPress={() => dispatch(signOut(navigation))}
            />
        </DrawerContentScrollView>
    )
}

export const RouteStack = () => {
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
            <Drawer.Navigator
                drawerContent={props => <LogoutComponent {...props} />}
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
                    </>
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