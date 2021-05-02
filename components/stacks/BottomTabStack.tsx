import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Home ,UserProfile } from '../../templates';
import AweIcon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';

const TabStack = createBottomTabNavigator();
const BottomTabStack = () => {
    return (
        <TabStack.Navigator tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
        }}>
            <TabStack.Screen name="Home" component={Home} options={{
                tabBarLabel: 'ホーム',
                tabBarIcon: ({ focused, color, size }) => (
                    <AweIcon name="home" size={size} color={color} />
                )
            }} />
            <TabStack.Screen name="UserProfile" component={UserProfile} options={{
                tabBarLabel: 'ユーザー',
                tabBarIcon: ({ focused, color, size }) => (
                    <AntIcon name="user" size={size} color={color} />
                )
            }} />
        </TabStack.Navigator>
    )

}
export default BottomTabStack