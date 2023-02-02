import React from 'react';
import {
  Box, Center, HStack, Icon, Pressable, Text,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Footer({ onChange, selected }) {
  return (
    <Box flex={1} safeAreaTop width="100%" alignSelf="center" position="absolute" bottom={0} zIndex={1}>
      <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
        <Pressable cursor="pointer" opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={() => onChange(0)}>
          <Center>
            <Icon mb="1" as={<MaterialCommunityIcons name={selected === 0 ? 'home' : 'home-outline'} />} color="white" size="xl" />
            <Text color="white" fontSize="14" bold>
              Home
            </Text>
          </Center>
        </Pressable>
        <Pressable cursor="pointer" opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => onChange(1)}>
          <Center>
            <Icon mb="1" as={<MaterialIcons name="search" />} color="white" size="xl" />
            <Text color="white" fontSize="14" bold>
              Map
            </Text>
          </Center>
        </Pressable>
        <Pressable cursor="pointer" opacity={selected === 3 ? 1 : 0.5} py="2" flex={1} onPress={() => onChange(3)}>
          <Center>
            <Icon mb="1" as={<MaterialCommunityIcons name={selected === 3 ? 'account' : 'account-outline'} />} color="white" size="xl" />
            <Text color="white" fontSize="14" bold>
              Account
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
}
