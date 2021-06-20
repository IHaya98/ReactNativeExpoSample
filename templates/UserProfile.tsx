import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../reducks/user/operation';
import { useNavigation } from '@react-navigation/native';
import { State } from '../reducks/store/type';

const UserProfile: React.FC = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const selector = useSelector((state: State) => state.users);
    const uid = selector.uid;
    const [username, setUsername] = useState(selector.username);

    const inputUsername = useCallback((text) => {
        setUsername(text);
    }, [setUsername]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ユーザー画面</Text>
            <Text style={styles.label}>ユーザー名</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={inputUsername}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="名前"
            />
            <TouchableHighlight underlayColor="#C70F66" style={styles.button} onPress={() => dispatch(updateUserInfo({ username:username, uid: uid }, navigation))}>
                <Text style={styles.buttonTitle}>変更を保存</Text>
            </TouchableHighlight>
        </View>
    );
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
    label: {
        alignSelf: 'flex-start'
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

export default UserProfile;