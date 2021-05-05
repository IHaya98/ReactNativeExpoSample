import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, Button, Image } from 'react-native';
import { ImageType } from '../../templates/NewPost';

type ImagePreview = {
    images: ImageType
    delete: any
}
const ImagePreview: React.FC<ImagePreview> = (props) => {
    return (
        <View>
            <Button title="削除" onPress={()=>props.delete(props.images.id)} />
            <Image source={{ uri: props.images.path }} style={styles.imageStyle}/>
        </View>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 300,
        flex: 1,
      },
});
export default ImagePreview;