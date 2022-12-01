import { StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import React, { useCallback, useState } from 'react';
import Main from './components/Main';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

const slides = [
  {
    key: 'k1',
    title: 'Достопримечательности',
    text: 'Все достопримечательности в одном приложении',
    image: {
      uri:
         'https://imgur.com/Um7rVkF.png',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#F7BB64',
  },
  {
    key: 'k2',
    title: 'Получай знания',
    text: 'Информация по каждому объекту на карте',
    image: {
      uri:
         'https://imgur.com/6vYEbjX.png',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#F4B1BA',
  },
  {
    key: 'k3',
    title: 'Текущее местоположение',
    text: 'Определение текущего местоположения',
    image: {
      uri: 'https://i.imgur.com/bXgn893.png',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#4093D2',
  },
  {
    key: 'k4',
    title: 'Бесплатно',
    text: 'Полностью бесплатное использование приложения',
    image: {
      uri: 'https://imgur.com/Sstki3B.png',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#644EE2',
  },
];

export default function App() {
  const [isOpenTutorial, setIsOpenTutorial] = useState(true);

  const onDoneAllSlides = useCallback(() => {
    setIsOpenTutorial(false);
  }, [setIsOpenTutorial]);

  return (
  // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {
          isOpenTutorial ? (
            <AppIntroSlider
              slides={slides}
              onDone={onDoneAllSlides}
              showSkipButton
              onSkip={onDoneAllSlides}
            />
          ) : <Main />
        }
    </>
  );
}
