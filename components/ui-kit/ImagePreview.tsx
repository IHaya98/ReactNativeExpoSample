import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, Button, Image } from 'react-native';
import { Modal } from 'react-native-paper';
import { TwoButtonAlert } from '.';
import { ImageType } from '../../reducks/tweet/type';

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
            <Button title="削除" onPress={toggleModal} />
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
    imageStyle: {
        height: 300,
        flex: 1,
    },
});
export default ImagePreview;