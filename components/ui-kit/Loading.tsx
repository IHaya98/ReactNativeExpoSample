import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { ActivityIndicator } from 'react-native';

const Loading: React.FC = () => {
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size='large'/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

export default Loading;