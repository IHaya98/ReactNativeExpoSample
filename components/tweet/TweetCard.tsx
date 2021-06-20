import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { useDispatch } from 'react-redux';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, Title, Paragraph, Modal } from 'react-native-paper';
import { Tweet } from '../../reducks/tweet/type';
import { deletePost } from '../../reducks/tweet/operation';
import { TwoButtonAlert } from '../ui-kit';
import { db } from '../../firebase/index'

const TweetCard: React.FC<Tweet | any> = (props) => {
    const dispatch = useDispatch();
    const id = props.id
    const imageId = props.images.id
    const containerStyle = { backgroundColor: 'white', padding: 50 };
    const [isModalVisible, setIsModalVisible] = useState(false),
    [isLike, setIsLike] = useState(false);
    const toggleLike = async() => {
        setIsLike(!isLike);
        if(isLike){
            await db.collection('posts').doc(id).set({likes:0},{merge:true});
        }else{
            await db.collection('posts').doc(id).set({likes:1},{merge:true});
        }
    }
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    }
    return (
        <Card style={styles.container}>
            <Card.Title title={props.username} subtitle={props.email}
                left={(props) => <AntIcon {...props} name="user" />}
                right={(props) =>
                    <Card.Actions>
                        <TouchableHighlight underlayColor="#C70F66" style={styles.button} onPress={toggleModal}>
                            <Text style={styles.buttonTitle}><MaterialIcon {...props} name="delete" />DELETE</Text>
                        </TouchableHighlight>
                    </Card.Actions>
                }
            />
            <Card.Content>
                <Title>{props.title}</Title>
                <Paragraph>{props.detail}</Paragraph>
            </Card.Content>
            {props.images &&
                <>
                    <Card.Cover source={{ uri: props.images.path }} />
                    <Modal visible={isModalVisible} contentContainerStyle={containerStyle}>
                        <TwoButtonAlert toggleModal={toggleModal} action={() => dispatch(deletePost(id, imageId))} />
                    </Modal>
                </>
            }
            {isLike &&
                <AntIcon {...props} style={styles.likebutton} name="heart" size={30} onPress={toggleLike}/>
            }
            {!isLike &&
                <AntIcon {...props} style={styles.likebutton} name="hearto" size={30} onPress={toggleLike}/>
            }
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
        backgroundColor: '#C70F66',
        alignSelf: 'center',
        margin: 10,
    },
    buttonTitle: {
        fontSize: 18,
        color: '#fff',
    },
    likebutton:{
        justifyContent: 'center',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        margin: 10,
    }
});

export default TweetCard;