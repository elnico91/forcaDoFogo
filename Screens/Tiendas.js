import React from 'react';
import { StyleSheet,View,Text,Dimensions,ScrollView } from 'react-native';
import MapView, { Marker,ProviderPropType } from 'react-native-maps';

import * as darkMode from './Inicio'

const LATITUDE = -36.9895864;
const LONGITUDE = -73.1923733;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * 1;

class Tiendas extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null,
    }
  }

  constructor(props) {
    super(props);
    this.Tiendas()
    this.state = {
      region: {
      latitude: LATITUDE,     
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
      },
      markers:[]
    }
  }

  Tiendas = () => {
        fetch('', { // Base de datos borrada
        method:'GET',
        cache:'no-cache',
        mode:'cors',
        headers:{
          'Accept':'application/json',
          'Content-type': 'application/json'
        },
        })
          .then((response)=> response.json()).then((responseJson) => {
          /*alert( JSON.stringify(responseJson))*/
          this.setState({markers:responseJson})

      }).catch((error)=> {
        alert("Error")
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={false}
          rotateEnabled={false}
          initialRegion={this.state.region}
          showsUserLocation={true}
          followsUserLocation={true}
        >

          {this.state.markers.map(marker => (
            <Marker
              coordinate={{
                  latitude : parseFloat(marker.latitud),
                  longitude : parseFloat(marker.longitud)
              }}
              title={marker.nombre}
            />
          ))}

        </MapView>
      </View>
    );
  }
}

Tiendas.propTypes = {
    provider: ProviderPropType,
};

const styles = StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    scrollview: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    map: {
        height: '100%',
        width: '100%'
    },
});

export default Tiendas;