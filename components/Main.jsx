import { StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import Footer from './Footer';
import MapTab from './MapTab';
import HomeTab from './HomeTab';
import AccountTab from './AccountTab';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#cbcbcb',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Main() {
  const [selected, setSelected] = React.useState(1);
  const [user] = React.useState({
    name: 'Vilyak',
    history: [],
    avatar: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  });

  const searchHandler = useCallback((city) => {
    user.history.push({
      timestamp: Date.now(),
      city,
    });
  }, [user]);

  return (
    <View style={styles.container}>
      {
        selected === 0 && <HomeTab user={user} />
      }
      {
        selected === 1 && <MapTab onSearch={searchHandler} />
      }
      {
        selected === 3 && <AccountTab user={user} />
      }
      <Footer onChange={setSelected} selected={selected} />
    </View>
  );
}
