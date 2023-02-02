import React from 'react';
import {
  Avatar, Box, Heading, HStack, Text, VStack,
} from 'native-base';
import { FlatList } from 'react-native';
import { Spacer } from '@react-native-material/core';
import { DateTime } from 'luxon';

export default function HomeTab({ user }) {
  // eslint-disable-next-line react/prop-types
  const data = user.history.map((item, index) => ({ ...item, id: index })).reverse();

  return (
    <Box w="100%" h="100%" bg="indigo.500" padding={10}>
      <Heading fontSize="3xl" p="4" pb="3" color="white">
        История поиска
      </Heading>
      <FlatList
        data={data}
        renderItem={({
          item,
        }) => (
          <Box
            key={`item-history-${item.id}`}
            borderBottomWidth="1"
            _dark={{
              borderColor: 'muted.50',
            }}
            borderColor="muted.800"
            pl={['0', '4']}
            pr={['0', '5']}
            py="2"
          >
            <HStack space={[2, 3]} justifyContent="space-between">
              <Avatar
                size="48px"
                source={{
                  uri: user.avatar,
                }}
              />
              <VStack>
                <Text
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="warmGray.100"
                  bold
                >
                  {item.city}
                </Text>
                <Text
                  color="coolGray.800"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                >
                  Достопримечательности
                  {' '}
                  (
                  {item.city}
                  )
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                right={140}
                color="white"
                alignSelf="flex-start"
                bold
              >
                {new Date(item.timestamp).toLocaleString(DateTime.DATE_SHORT)}
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
}
