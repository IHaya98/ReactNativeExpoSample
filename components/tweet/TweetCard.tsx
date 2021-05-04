import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet,Button, View, Text, TextInput, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Avatar,  Card, Title, Paragraph, Modal } from 'react-native-paper';
import { Tweet } from '../../reducks/tweet/type';
import { deletePost } from '../../reducks/tweet/operation';
import { TwoButtonAlert } from '../ui-kit';

const TweetCard: React.FC<Tweet|any> = (props) => {
    const dispatch = useDispatch();
    const id = props.id
    const containerStyle = { backgroundColor: 'white', padding: 50};
    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    }
    return (
        <Card style={styles.container}>
            <Card.Title title={props.username} subtitle={props.email}
                left={(props) => <AntIcon {...props} name="user" />}
                right={(props) =>
                    <Card.Actions>
                        <Button {...props} title={"DELETE"} onPress={toggleModal} />
                    </Card.Actions>
                }
            />
            <Card.Content>
                <Title>{props.title}</Title>
                <Paragraph>{props.detail}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://source.unsplash.com/random' }} />
            <Modal visible={isModalVisible} contentContainerStyle={containerStyle}>
                    <TwoButtonAlert toggleModal={toggleModal} id={id} />
            </Modal>
        </Card>
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

export default TweetCard;