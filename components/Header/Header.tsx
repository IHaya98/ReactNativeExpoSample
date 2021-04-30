import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
// ヘッダータイトルコンポーネント
const Header = () => {
    return (
        <TouchableOpacity onPress={() => alert('headerTitle Tapped')}>
            <Text>Title Component</Text>
        </TouchableOpacity>
    );
};
export default Header;