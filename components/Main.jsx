import { StyleSheet, View, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput } from '@react-native-material/core';
import MapView, { Marker } from 'react-native-maps';
import { PROVIDER_DEFAULT } from 'react-native-maps/lib/ProviderConstants';
import Scrape from '../googleMapsScraper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cbcbcb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '90%',
  },
  box: {
    width: '90%',
    backgroundColor: 'green',
  },
  map: {
    width: '90%',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#20232a',
    marginTop: 15,
  },
  findBtn: {
    width: '90%',
  },
});

export default function Main() {
  const [city, setCity] = useState('');
  const [cityInfo, setCityInfo] = useState([]);
  const [mapRef, setMapRef] = useState();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChange={(e) => setCity(e.nativeEvent.text)}
        label="Введите любой город"
        variant="outlined"
      />
      <Button
        variant="contained"
        title="Найти"
        style={styles.findBtn}
        onPress={() => {
          Scrape(`Достопримечательности+${city}`).then((data) => {
            setCityInfo(data);
            if (mapRef) {
              mapRef.fitToSuppliedMarkers(data.map((value, index) => `marker-${index}`), true);
            }
          });
        }}
      />

      <MapView
        style={{ ...styles.map, height: useWindowDimensions().height - 200 }}
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
    </View>
  );
}
