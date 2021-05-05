import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, Button, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { storage } from '../../firebase/index';
import { getUniqueStr } from '../../reducks/tweet/operation';
import { ImageType } from '../../templates/NewPost';
import { ImagePreview } from '.';

type ImageArea = {
    images: ImageType
    setImages: any
}
const ImageArea: React.FC<ImageArea> = (props) => {

    const deleteImage = useCallback(async (id) => {
        const ret = window.confirm('この画像を削除しますか？')
        if (!ret) {
            return false
        } else {
            props.setImages(null);
            return storage.ref('image').child(id+'.jpg').delete()
        }
    }, [props.images])

    const uploadImage = useCallback(async () => {
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        const localUri = await fetch(result.uri);
        const localBlob = await localUri.blob();

        const imageId = getUniqueStr();

        const storageRef = storage.ref().child('image/' + imageId + '.jpg');
        const uploadTask = storageRef.put(localBlob);

        uploadTask.then(() => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const newImage = { id: imageId, path: downloadURL };
                props.setImages(newImage)
            });
        })
    },[props.setImages])

    return (
        <View >
            <Button title="写真を選択" onPress={uploadImage} />
            {props.images &&
                <ImagePreview key={props.images.id} images={props.images} delete={deleteImage}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 300,
        flex: 1,
      },
});
export default ImageArea;