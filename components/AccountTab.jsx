import React from 'react';
import {
  Avatar, Box, Button, Heading, Icon,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

// eslint-disable-next-line react/prop-types
export default function AccountTab({ user }) {
  return (
    <Box w="100%" h="100%" bg="indigo.500" padding={10} alignItems="center">
      {/* eslint-disable-next-line react/prop-types */}
      <Heading fontSize="5xl" p="4" pb="3" color="white">{user.name}</Heading>
      <Avatar
        top={5}
        bg="amber.500"
        source={{
          uri: user?.avatar,
        }}
        style={{ width: '70%', height: '30%' }}
        size="2xl"
      >
        <Avatar.Badge bg="green.500" bottom={4} right={4} />
      </Avatar>
      <Button variant="solid" h={10} endIcon={<Icon as={Ionicons} name="exit" size="xl" />} top={10}>
        Изменить пароль
      </Button>
      <Button variant="subtle" h={10} w={250} endIcon={<Icon as={Ionicons} name="exit" size="xl" />} position="absolute" bottom={40}>
        Выход
      </Button>
    </Box>
  );
}
