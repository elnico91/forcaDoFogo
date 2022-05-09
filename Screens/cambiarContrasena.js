import React, { Component } from "react";
import { DrawerLayoutAndroid, Text, StyleSheet, View, Image,TextInput,Button } from "react-native";
import { Switch } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import * as app from '../App'
import * as cc from './tomarCorreo'


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
            contrasena:'',
            listadoEmail:[]
          };
      };
    
    cambiarContra = () => {
        const { contrasena } = this.state;
    
        fetch('', { // Base de datos borrada
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            correo: cc.correoActualizar,
            contrasena: contrasena
          })
        }).then((respuesta) => respuesta.json()).then((responseJson) => {
          if (responseJson == "No") {
            alert("Datos incorrectos, por favor revise los datos.")
          } if (contrasena.length == 0){
            alert("El campo esta vacío, por favor rellene.")
          }  
          else {
            this.setState({ listadoEmail: responseJson })
            alert("Se cambio correctamente su contraseña.")
            this.props.navigation.navigate('Login')          
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
                        <Text>Ingrese nueva contraseña</Text>
                        <TextInput style={styles.input} placeholder="Ingrese su nueva contraseña" secureTextEntry={true} onChangeText={contrasena => this.setState({ contrasena })}/>
                    </SafeAreaView>

                    <View style={{marginBottom: 10, marginTop: 10, width: 300, backgroundColor: '#44494D', padding: 5}}>
                        <Button title="Cambiar contraseña" color="#44494D" onPress={this.cambiarContra}/>
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