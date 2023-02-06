import React, { useState } from 'react';
import {
  Input, Button, Text, Stack, FormControl,
} from 'native-base';
import axios from 'axios';
import { Alert } from 'react-native';

export default function LoginScreen(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://45.156.23.232:3000/auth/login', {
        username,
        password,
      });
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      props.onUser(response.data);
    } catch (e) {
      Alert.alert(
        'Внимание!',
        'Неправильно введен пароль или пользователь не найден!',
        [
          { text: 'Хорошо' },
        ],
        {
          cancelable: true,
        },
      );
    }
  };

  const handleSignUp = async () => {
    try {
      await axios.post('http://45.156.23.232:3000/auth/register', {
        username,
        password,
      });
      Alert.alert(
        'Успешно',
        'Вы успешно зарегистрировались! Пожалуйста войдите в аккаунт.',
        [
          { text: 'Хорошо' },
        ],
        {
          cancelable: true,
        },
      );
      setUsername('');
      setPassword('');
      setIsLogin(true);
    } catch (e) {
      Alert.alert(
        'Внимание!',
        'Такой пользователь уже существует!',
        [
          { text: 'Хорошо' },
        ],
        {
          cancelable: true,
        },
      );
    }
  };

  return (
    <FormControl bg="indigo.500" height="100%" paddingTop={40} paddingLeft={10} paddingRight={10}>
      <Stack space={5}>
        <Stack rounded>
          <Text marginLeft={2} marginBottom={1}>Username</Text>
          <Input bg="white" variant="underlined" value={username} p={2} placeholder="Username" onChangeText={(text) => setUsername(text)} />
        </Stack>
        <Stack>
          <Text marginLeft={2} marginBottom={1}>Password</Text>
          <Input bg="white" variant="underlined" value={password} p={2} placeholder="Password" onChangeText={(text) => setPassword(text)} />
        </Stack>
        <Stack>
          {isLogin ? (
            <Button block onPress={handleLogin}>
              <Text>Вход</Text>
            </Button>
          ) : (
            <Button block onPress={handleSignUp}>
              <Text>Регистрация</Text>
            </Button>
          )}
        </Stack>
        <Button block onPress={() => setIsLogin(!isLogin)}>
          <Text>
            {isLogin ? 'Нужно зарегистрироваться?' : 'Уже имеешь аккаунт?'}
          </Text>
        </Button>
      </Stack>
    </FormControl>
  );
}
