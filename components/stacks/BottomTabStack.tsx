import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Home, NewPost, UserProfile } from '../../templates';
import AweIcon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';

const TabStack = createBottomTabNavigator();
const BottomTabStack = () => {
    return (
        <TabStack.Navigator tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
        }} initialRouteName="Home">
            <TabStack.Screen name="NewPost" component={NewPost} options={{
                tabBarLabel: '新規追加',
                tabBarIcon: ({ focused, color, size }) => (
                    <IonIcon name="add-circle" size={size} color={color} />
                )
            }} />
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