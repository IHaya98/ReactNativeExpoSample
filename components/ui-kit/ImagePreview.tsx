import React, { useState } from 'react';
import { StyleSheet, View, Text,  TouchableHighlight, Image } from 'react-native';
import { Modal } from 'react-native-paper';
import { TwoButtonAlert } from '.';
import { ImageType } from '../../reducks/tweet/type';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type ImagePreview = {
    images: ImageType
    delete: any
}
const ImagePreview: React.FC<ImagePreview> = (props) => {
    const containerStyle = { backgroundColor: 'white', padding: 50};
    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    }
    return (
        <View style={styles.container}>
            <TouchableHighlight underlayColor="#C70F66" style={styles.del_button} onPress={toggleModal}>
                <Text style={styles.buttonTitle}><MaterialIcon {...props} name="delete" size={20}/>削除</Text>
            </TouchableHighlight>
            <Image source={{ uri: props.images.path }} style={styles.imageStyle} />
            <Modal visible={isModalVisible} contentContainerStyle={containerStyle}>
                <TwoButtonAlert toggleModal={toggleModal} action={()=>props.delete(props.images.id)} />
            </Modal>
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
    del_button: {
        height: 48,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C70F66',
        alignSelf: 'flex-end',
    },
    buttonTitle: {
        fontSize: 18,
        color: '#fff',
    },
    imageStyle: {
        height: 300,
        flex: 1,
    },
});
export default ImagePreview;