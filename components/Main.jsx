import { StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import Footer from './Footer';
import MapTab from './MapTab';
import HomeTab from './HomeTab';
import AccountTab from './AccountTab';
import ChangePasswordView from './ChangePasswordView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#cbcbcb',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Main({ user, onExit }) {
  const [selected, setSelected] = React.useState(1);
  const [isOpenChangePsw, setIsOpenChangePsw] = React.useState(false);

  const [userInfo] = React.useState({
    name: user.username,
    history: [],
    avatar: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  });

  const searchHandler = useCallback((city) => {
    userInfo.history.push({
      timestamp: Date.now(),
      city,
    });
  }, [userInfo]);

  return (
    <View style={styles.container}>
      {
        selected === 0 && <HomeTab user={userInfo} />
      }
      {
        selected === 1 && <MapTab onSearch={searchHandler} />
      }
      {
        selected === 3 && <AccountTab user={userInfo} onExit={onExit} onChangePassword={() => setIsOpenChangePsw(true)} />
      }
      <Footer onChange={setSelected} selected={selected} />
      {isOpenChangePsw
          && <ChangePasswordView user={userInfo} onBack={() => setIsOpenChangePsw(false)} />}
    </View>
  );
}
