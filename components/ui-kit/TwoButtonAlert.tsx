import React, { useState } from "react";
import { Alert, StyleSheet, Text, Pressable, View, Button } from "react-native";
import Modal from 'react-native-modal'
import { useDispatch } from "react-redux";
import { deletePost } from "../../reducks/tweet/operation";

const TwoButtonAlert = (props: any) => {
    const dispatch = useDispatch();
    const toggleModal = props.toggleModal
    const id = props.id
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
            <Text>Modal Content</Text>
            <Button
                title="Close modal"
                onPress={toggleModal}
            />
            <Button
                title="OK"
                onPress={()=>dispatch(deletePost(id))}
            />
        </View>
    );
};

export default TwoButtonAlert;