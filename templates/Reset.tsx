import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
import { useDispatch } from 'react-redux'
import { resetPassword } from '../reducks/user/operation';

const Reset: React.FC = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const navigation = useNavigation();

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail]);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>パスワードのリセット</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={inputEmail}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Email"
            />
            <TouchableHighlight underlayColor="#C70F66" style={styles.button} onPress={resetPassword(email,navigation)}>
                <Text style={styles.buttonTitle}>パスワードのリセットメールを送信する</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="#C70F66" style={styles.button} onPress={navigation.goBack}>
                <Text style={styles.buttonTitle}>前に戻る</Text>
            </TouchableHighlight>
        </View>
    )
}
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
    input: {
        backgroundColor: '#ddd',
        height: 48,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
    },
    button: {
        height: 48,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        width: '60%',
        alignSelf: 'center',
        margin: 10,
    },
    buttonTitle: {
        fontSize: 18,
        color: '#fff',
    },
});
export default Reset