import 'react-native-gesture-handler';

import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';

const NavigationDrawerStructure = (props: any) => {
    //Structure for the navigatin Drawer
    const toggleDrawer = () => {
        //Props to open/close the drawer
        props.navigationProps.toggleDrawer();
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => toggleDrawer()}>
                <Icon
                    name="list-thumbnails"
                    size={30}
                    style={{ marginLeft: 20,color: 'white' }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default NavigationDrawerStructure;