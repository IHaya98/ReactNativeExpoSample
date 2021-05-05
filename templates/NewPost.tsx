import React, { useCallback, useState } from 'react';
import { StyleSheet,  Text, TextInput, TouchableHighlight, ScrollView, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { newPost } from '../reducks/tweet/operation';
import { State } from '../reducks/store/type';
import { ImageArea } from '../components/ui-kit';
import { ImageType } from '../reducks/tweet/type';

const NewPost: React.FC = () => {
    const navigation = useNavigation();
    const selector = useSelector((state: State) => state.users);
    const uid = selector.uid;

    const [height, setHight] = useState(48),
        [images, setImages] = useState<ImageType>(),
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
        setImages(undefined)
    }

    const style_detail = StyleSheet.create({
        inputDetail: {
            backgroundColor: '#ddd',
            height: height,
            margin: 20,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 8,
        },
    });
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
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
                <ImageArea images={images!} setImages={setImages} />
                <TouchableHighlight underlayColor="#C70F66" style={styles.button} onPress={() => {
                    dispatch(newPost({ image: images, title: title, detail: detail, uid: uid }, navigation))
                    if (title != "" && detail != "") {
                        initialize()
                    }
                }}>
                    <Text style={styles.buttonTitle}>New Post</Text>
                </TouchableHighlight>
            </ScrollView>
        </SafeAreaView>
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
        margin: 20,
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
        margin: 20,
    },
    buttonTitle: {
        fontSize: 18,
        color: '#fff',
    },
});
export default NewPost;