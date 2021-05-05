import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
import { signUp } from '../reducks/user/operation';

const SignUp: React.FC = (props) => {
  const [email, setEmail] = useState(""),
    [username, setUsername] = useState(""),
    [password, setPassword] = useState("");
  const navigation = useNavigation();

  const inputEmail = useCallback((text) => {
    setEmail(text);
  }, [setEmail]);

  const inputUsername = useCallback((text) => {
    setUsername(text);
  }, [setUsername]);

  const inputPassword = useCallback((text) => {
    setPassword(text);
  }, [setPassword]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>新規登録</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={inputEmail}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={inputUsername}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={inputPassword}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableHighlight underlayColor="#C70F66" style={styles.button} onPress={signUp({ email, username, password, navigation })}>
        <Text style={styles.buttonTitle}>新規登録する</Text>
      </TouchableHighlight>
      <TouchableHighlight underlayColor="#C70F66" style={styles.button} onPress={navigation.goBack}>
        <Text style={styles.buttonTitle}>前に戻る</Text>
      </TouchableHighlight>
    </View>
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

export default SignUp;