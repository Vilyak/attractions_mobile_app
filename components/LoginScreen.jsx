import React, { useState } from 'react';
import {
  Input, Button, Text, Stack, FormControl,
} from 'native-base';
import axios from 'axios';

export default function LoginScreen(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async () => {
    const response = await axios.post('http://192.168.8.29:3000/auth/login', {
      username,
      password,
    }).catch((e) => console.error(e));
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    props.onUser(response.data);
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        username,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormControl bg="indigo.500" height="100%" paddingTop={40} paddingLeft={10} paddingRight={10}>
      <Stack space={5}>
        <Stack rounded>
          <FormControl.Label>Username</FormControl.Label>
          <Input bg="white" variant="underlined" value={username} p={2} placeholder="Username" onChangeText={(text) => setUsername(text)} />
        </Stack>
        <Stack>
          <FormControl.Label>Password</FormControl.Label>
          <Input bg="white" variant="underlined" value={password} p={2} placeholder="Password" onChangeText={(text) => setPassword(text)} />
        </Stack>
        <Stack>
          {isLogin ? (
            <Button block onPress={handleLogin}>
              <Text>Login</Text>
            </Button>
          ) : (
            <Button block onPress={handleSignUp}>
              <Text>Sign Up</Text>
            </Button>
          )}
        </Stack>
        <Button block onPress={() => setIsLogin(!isLogin)}>
          <Text>
            {isLogin ? 'Need to Sign Up?' : 'Already have an account?'}
          </Text>
        </Button>
      </Stack>
    </FormControl>
  );
}
