import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StyleSheet, Text, View, Button, Image, TextInput, SafeAreaView, Switch } from 'react-native';

import InicioScreen from './Screens/Inicio'
import RegistrarScreen from './Screens/RegistrarCuenta'
import RegistroDispositivosScreen from './Screens/RegistroDispositivos'
import ConfiguracionScreen from './Screens/Configuracion'
import LogsScreen from './Screens/Logs'
import Tiendas from './Screens/Tiendas';
import tomarCorreo from './Screens/tomarCorreo'
import cambiarContrasena from './Screens/cambiarContrasena'

export var RUT_GLOBAL = '';
import * as dark from './Screens/ModoOscuro'

class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null,
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      correo: '',
      contrasena: '',
      listadoRUT: []
    };
  }

  Login = () => {
    const { correo } = this.state;
    const { contrasena } = this.state;

    fetch('', { // Base de datos borrada
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        correo: correo,
        contrasena: contrasena
      })
    }).then((respuesta) => respuesta.json()).then((responseJson) => {
      if (responseJson == "No") {
        alert("Datos incorrectos, por favor revise los datos")
      } else {
        this.setState({ listadoRUT: responseJson })
        {
          this.state.listadoRUT.map(item => (
            RUT_GLOBAL = item.RUT
          ))
        }
        this.props.navigation.navigate('Inicio')
      }
    }).catch((error) => {
      alert("Error")
    })
  }

  render() {

    return (
      <View style={[(dark.modo) ? styles.containerLight : styles.containerDark]}>
        {/*<Text>Modo Oscuro  </Text>
        <dark.App />*/}

        <Image source={require('./assets/logoInicio.png')} style={{ marginTop: 0, marginBottom: 50 }} />

        <SafeAreaView>

          <TextInput style={[(dark.modo) ? styles.inputLight : styles.inputDark]} placeholder="Ingrese su correo" keyboardType={'email-address'} onChangeText={correo => this.setState({ correo })} />
          <TextInput style={[(dark.modo) ? styles.inputLight : styles.inputDark]} placeholder="Ingrese su contraseña" secureTextEntry={true} onChangeText={contrasena => this.setState({ contrasena })} />

        </SafeAreaView>

        <View style={[(dark.modo) ? styles.botton2Light : styles.botton2Dark]}>
          <Button title="Iniciar Sesion" onPress={this.Login} color="#44494D" />
        </View>



        <View style={{ marginBottom: 10, marginTop: 10, width: 300, backgroundColor: '#44494D', padding: 5, }}>
          <Button color="#44494D" title="Registrarse" onPress={() => this.props.navigation.navigate('RegistrarCuenta')} />
        </View>
        <View>
          <Text style={[(dark.modo) ? styles.textLight : styles.textDark]} onPress={() => this.props.navigation.navigate('tomarCorreo')}>Haz olvidado tu contraseña?</Text>
        </View>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  RegistrarCuenta: {
    screen: RegistrarScreen
  },
  Tiendas: {
    screen: Tiendas
  },
  Inicio: {
    screen: InicioScreen
  },
  RegistroDispositivos: {
    screen: RegistroDispositivosScreen
  },
  Configuracion: {
    screen: ConfiguracionScreen
  },
  Logs: {
    screen: LogsScreen
  },
  tomarCorreo: {
    screen: tomarCorreo
  },
  cambiarContrasena: {
    screen: cambiarContrasena
  },
});

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerDark: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputLight: {
    height: 40,
    width: 300,
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },

  inputDark: {
    backgroundColor: '#FFFFFF',
    height: 40,
    width: 300,
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },

  botton1Light: {
    marginTop: 10,
    width: 300,
    backgroundColor: '#44494D',
    padding: 5
  },

  botton1Dark: {
    marginTop: 10,
    width: 300,
    backgroundColor: '#D6E5F1',
    padding: 5
  },

  botton2Light: {
    marginBottom: 10,
    marginTop: 10,
    width: 300,
    backgroundColor: '#44494D',
    padding: 5
  },

  botton2Dark: {
    marginBottom: 10,
    marginTop: 10,
    width: 300,
    backgroundColor: '#44494D',
    padding: 5
  },

  textLight: {
    marginTop: 50,
    marginBottom: 50,
  },
  textDark: {
    color: '#FFFFFF',
    marginTop: 50,
    marginBottom: 50,
  }
});

export default createAppContainer(AppNavigator);