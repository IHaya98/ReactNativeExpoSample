import React from "react";
import {  StyleSheet, Text,  View, Button } from "react-native";

type TwoButtonAlert ={
    toggleModal: any
    action: any
}
const TwoButtonAlert:React.FC<TwoButtonAlert> = (props) => {
    const toggleModal = props.toggleModal
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.title}>削除しますか？</Text>
            <View style={styles.button_grp}>
                <View style={styles.button}>
                    <Button
                        title="削除"
                        onPress={() => props.action()}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="キャンセル"
                        onPress={toggleModal}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        alignSelf: 'center',
        marginBottom: 24,
    },
    button_grp: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
    },
    button: {
        marginLeft: 30,
        marginRight: 30,
    },
});

export default TwoButtonAlert;