import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { newPost } from '../reducks/tweet/operation';
import { State } from '../reducks/store/type';

const NewPost: React.FC = () => {
    const navigation = useNavigation();
    const selector = useSelector((state: State) => state.users);
    const uid = selector.uid;

    const [height, setHight] = useState(48),
        [title, setTitle] = useState(""),
        [detail, setDetail] = useState("");
    const dispatch = useDispatch();

    const inputTitle = useCallback((text) => {
        setTitle(text);
    }, [setTitle]);

    const inputDetail = useCallback((text) => {
        setDetail(text);
    }, [setDetail]);

    const initialize = () => {
        setHight(48)
        setTitle("")
        setDetail("")
    }

    const style_detail = StyleSheet.create({
        inputDetail: {
            backgroundColor: '#ddd',
            height: height,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 8,
        },
    });
    return (
        <View style={styles.container}>
            <Text style={styles.title}>新規追加</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={inputTitle}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="題名"
            />
            <TextInput
                style={style_detail.inputDetail}
                value={detail}
                onChangeText={inputDetail}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="説明"
                multiline={true}
                onContentSizeChange={(event) => {
                    if (event.nativeEvent.contentSize.height <= 48) {
                        setHight(48);
                    } else {
                        setHight(event.nativeEvent.contentSize.height);
                    }
                }}
            />
            <TouchableHighlight underlayColor="#C70F66" style={styles.button} onPress={() => {
                dispatch(newPost({ title: title, detail: detail, uid: uid }, navigation))
                if(title!="" && detail !=""){
                    initialize()
                }
                
            }}>
                <Text style={styles.buttonTitle}>New Post</Text>
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
export default NewPost;