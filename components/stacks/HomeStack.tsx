import 'react-native-gesture-handler';

import * as React from 'react';
import {
    getFocusedRouteNameFromRoute, useNavigation,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabStack from './BottomTabStack';
import NavigationDrawerStructure from './NavigationDrawerStructure';


const Stack = createStackNavigator();

const getHeaderTitle = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'BottomTabStack';

    switch (routeName) {
        case 'Home':
            return 'ホーム';
        case 'UserProfile':
            return 'ユーザー';
        case 'NewPost':
            return '新規追加';
        case 'BottomTabStack':
            return 'ホーム';
    }
};

const HomeStack = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="BottomTabStack"
                component={BottomTabStack}
                options={({ route }) => ({
                    headerTitle: getHeaderTitle(route),
                    headerLeft: () => (
                        <NavigationDrawerStructure
                            navigationProps={navigation}
                        />
                    ),
                    headerStyle: {
                        backgroundColor: '#000000', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                })}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;