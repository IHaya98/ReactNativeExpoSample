import React, { useCallback } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../firebase/index';
import { getUniqueStr } from '../../reducks/tweet/operation';
import { ImagePreview } from '.';
import { ImageType } from '../../reducks/tweet/type';

type ImageArea = {
    images: ImageType
    setImages: any
}
const ImageArea: React.FC<ImageArea> = (props) => {

    const deleteImage = useCallback(async (id) => {
        props.setImages(null);
        return storage.ref('image').child(id + '.jpg').delete()
    }, [props.images])

    const uploadImage = useCallback(async () => {
        const result: any = await ImagePicker.launchImageLibraryAsync({
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
    }, [props.setImages])

    return (
        <View >
            <TouchableHighlight underlayColor="#C70F66" style={styles.button} onPress={uploadImage}>
                <Text style={styles.buttonTitle}>写真を選択</Text>
            </TouchableHighlight>
            {props.images &&
                <ImagePreview key={props.images.id} images={props.images} delete={deleteImage} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
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
    imageStyle: {
        height: 300,
        flex: 1,
    },
});
export default ImageArea;