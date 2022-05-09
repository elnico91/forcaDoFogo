import React, { Component } from "react";
import { DrawerLayoutAndroid, Text, StyleSheet, View, Image,TextInput,Button } from "react-native";
import { Switch } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import * as app from '../App'

export var correoActualizar = '';

export default class Configuracion extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
        }
    }

    constructor(props) {
        super(props);
       
        this.state = {
            isReady: false,
            correo:'',
            listadoEmail:[]
          };
      };
    
    consultarEmail = () => {
        const { correo } = this.state;
    
        fetch('', { // Base de datos borrada
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            correo: correo
          })
        }).then((respuesta) => respuesta.json()).then((responseJson) => {
          if (responseJson == "No") {
            alert("Correo incorrecto, por favor revise el correo puesto.")
          } else {
            this.setState({ listadoEmail: responseJson })
            {
                this.state.listadoEmail.map(item => (
                    correoActualizar = item.correo
                ))
              }
            this.props.navigation.navigate('cambiarContrasena')
          }
        }).catch((error) => {
          alert("Error")
        })
    }

    render() {
        return (
            <View>
                <View style={{ backgroundColor: '#DF2027', marginTop: 50, marginBottom: 10, paddingBottom: 10, paddingTop: 10, width: 720 }}>
                    <Text style={{ color: 'white', fontSize: 25 }}>  Recuperar Contraseña</Text>
                </View>
                <View style={styles.container}>
                    <SafeAreaView>
                        <Text>Ingrese su correo</Text>
                        <TextInput style={styles.input} placeholder="Ingrese el correo" keyboardType={'email-address'} onChangeText={correo => this.setState({correo})}/>
                    </SafeAreaView>

                    <View style={{marginBottom: 10, marginTop: 10, width: 300, backgroundColor: '#44494D', padding: 5}}>
                        <Button title="Enviar" color="#44494D" onPress={this.consultarEmail}/>
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input:{
        height: 40,
        width: 300,
        margin: 5, 
        borderWidth: 1,
        padding: 10,
    }

});