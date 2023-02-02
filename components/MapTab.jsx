import { StyleSheet, Keyboard } from 'react-native';
import {
  Box,
  Button, Input, SearchIcon,
} from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import { PROVIDER_DEFAULT } from 'react-native-maps/lib/ProviderConstants';
import React, { useState } from 'react';
import Scrape from '../googleMapsScraper';

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '105%',
    borderWidth: 1,
    marginTop: 15,
  },
});

export default function MapTab({ onSearch }) {
  const [city, setCity] = useState('');
  const [cityInfo, setCityInfo] = useState([]);
  const [mapRef, setMapRef] = useState();

  return (
    <Box w="100%">
      <Input
        variant="rounded"
        position="absolute"
        top={94}
        left={3}
        right={100}
        zIndex={1}
        placeholder="Введите любой город"
        backgroundColor="white"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <Button
        variant="solid"
        position="absolute"
        title="Найти"
        borderRadius={20}
        top={92}
        width={20}
        right={3}
        fontSize="3xl"
        zIndex={1}
        background="indigo.600"
        onPress={() => {
          Keyboard.dismiss();
          Scrape(`Достопримечательности+${city}`).then((data) => {
            setCityInfo(data);
            onSearch(city);
            if (mapRef) {
              mapRef.fitToSuppliedMarkers(data.map((value, index) => `marker-${index}`), true);
            }
          });
        }}
      >
        <SearchIcon color="white" />
      </Button>
      <MapView
        style={{ ...styles.map }}
        ref={(ref) => {
          setMapRef(ref);
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_DEFAULT}
        mapType="standard"
      >

        <SearchIcon scolor="white" />

        {cityInfo.map((info, index) => (
          <Marker
            identifier={`marker-${index}`}
            key={`${info.name}-marker`}
            coordinate={{ latitude: info.coords[0], longitude: info.coords[1] }}
            title={info.name}
            description={info.location}
          />
        ))}
      </MapView>
    </Box>
  );
}
