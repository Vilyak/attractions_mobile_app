import React, { useState } from 'react';
import {
  Input, Button, Text, Stack, FormControl,
} from 'native-base';
import axios from 'axios';
import { Alert } from 'react-native';

export default function ChangePasswordView(props) {
  // eslint-disable-next-line react/prop-types
  const { user, onBack } = props;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  const handleChangePassword = async () => {
    try {
      if (newPassword !== newPassword2) {
        Alert.alert(
          'Внимание!',
          'Вы повторили новый пароль НЕ правильно!',
          [
            { text: 'Хорошо' },
          ],
          {
            cancelable: true,
          },
        );
      } else {
        await axios.post('http://45.156.23.232:3000/auth/register', {
          username: user.name,
          oldPassword,
          newPassword,
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
        setOldPassword('');
        setNewPassword('');
        setNewPassword2('');
      }
    } catch (e) {
      Alert.alert(
        'Внимание!',
        'Не правильный старый пароль!',
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
    <FormControl bg="indigo.500" height="100%" paddingTop={40} paddingLeft={10} paddingRight={10} top={0} position="absolute">
      <Stack space={5}>
        <Stack rounded>
          <Text marginLeft={2} marginBottom={1}>Старый пароль</Text>
          <Input bg="white" variant="underlined" value={oldPassword} p={2} placeholder="Старый пароль" onChangeText={(text) => setOldPassword(text)} />
        </Stack>
        <Stack>
          <Text marginLeft={2} marginBottom={1}>Password</Text>
          <Input bg="white" variant="underlined" value={newPassword} p={2} placeholder="Новый пароль" onChangeText={(text) => setNewPassword(text)} />
        </Stack>
        <Stack>
          <Text marginLeft={2} marginBottom={1}>Password</Text>
          <Input bg="white" variant="underlined" value={newPassword2} p={2} placeholder="Повтор нового пароля" onChangeText={(text) => setNewPassword2(text)} />
        </Stack>
        <Stack>
          <Button block onPress={handleChangePassword}>
            <Text>Смена пароля</Text>
          </Button>
        </Stack>
        <Button block onPress={() => onBack()}>
          <Text>
            Назад
          </Text>
        </Button>
      </Stack>
    </FormControl>
  );
}
