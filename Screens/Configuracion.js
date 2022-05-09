import React, { Component, useState } from "react";
import { DrawerLayoutAndroid, Text, StyleSheet, View, Image, Button, TextInput } from "react-native";
import { Switch } from "react-native-gesture-handler";

import * as app from '../App'
import * as darkMode from './Inicio'

var booleanSwitch = false
var numeroCelularTexto = ""
var numeroCelularValidar = false

export default class Configuracion extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
        }
    }

    constructor(props) {
        super(props);
        this.validarNumero2()
        this.state = {
            modoOscuro:'',
            numeroCelular:darkMode.numeroCelularEmergencia,
            listadoConfig:[]
        };
    }

    Actualizar = () => {
        const {modoOscuro} = this.state;
        const {numeroCelular} = this.state;
  
        fetch('', { // Base de datos borrada
          method:'POST',
          header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            RUT: app.RUT_GLOBAL,
            modoOscuro: modoOscuro,
            numeroCelular: numeroCelular,
          })
        }).then((respuesta)=> respuesta.text()).then((responseJson) => {
                if(responseJson == "No"){     
                    alert('Hubo un error al registrarse, revise los datos o intentelo de nuevo')
                }else{
                    alert('Configuracion guardada correctamente');
                    if (this.state.modoOscuro == 1) {
                        darkMode.darkMode = true
                    } else {
                        darkMode.darkMode = false
                    }
                    darkMode.numeroCelularEmergencia = this.state.numeroCelular
                    this.props.navigation.navigate('Inicio')
                }                
        }).catch((error)=> {
              alert(error)
        })
    }

    SwitchDarkMode = () => {
        const [isEnabled, setIsEnabled] = useState(darkMode.darkMode);
        const toggleSwitch = () => setIsEnabled(previousState => !previousState);

        return (
            <View style={[(darkMode.darkMode) ? styles.containerPickerDark : styles.containerPicker ]}>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={this.validarSwitch(isEnabled)}
                />
            </View>
        );
    }

    validarSwitch = (boolean) => {
        booleanSwitch = boolean
        return boolean
    }

    validarNumero = (numero) => {

        var numerolenght = "" + ~~numero

        if (numerolenght.length == 9){
            this.state.numeroCelular = numero
            numeroCelularTexto = ""
            numeroCelularValidar = true
        } else {
            numeroCelularTexto = "Numero de celular incorrecto, verifique su numero ante poniendo el 9"
            numeroCelularValidar = false
        }

    }

    validarNumero2(){
        var numerolenght = "" + ~~darkMode.numeroCelularEmergencia

        if (numerolenght.length == 9){
            numeroCelularValidar = true
        }
    }

    validarGuardado = () => {
        var contador = 0

        if (numeroCelularValidar) {
            contador += 1    
        }

        if (booleanSwitch) {
            this.state.modoOscuro = 1
        } else {
            this.state.modoOscuro = 0
        }
        
        if (contador == 1) {
            this.Actualizar()
        } else{
            alert("Numero de emergencia no puede estar vacio")
        }
    }

    render(){       

        const navigationView = () => (
            <View style={[styles.container, styles.navigationContainer]}>
                <View style={{ flexDirection: "row" }}>
                    <Image source={require('../assets/avatar.png')} style={{ marginTop: 35, width: 60, height: 60, }} />
                    <Text style={styles.paragraph}>Usuario</Text>
                </View>
                <Text style={{ color: '#5D6575', fontSize: 20, marginTop: 15 }} onPress={()=>this.props.navigation.navigate('Inicio')}>Dispositivos</Text>
                <Text style={{ color: '#5D6575', fontSize: 20, marginTop: 30 }} onPress={()=>this.props.navigation.navigate('Logs')}>Registros</Text>
                <Text style={{ color: '#5D6575', fontSize: 20, marginTop: 30 }} onPress={()=>this.props.navigation.navigate('Tiendas')}>Nuestras Tiendas</Text>    
                <Text style={{ color: 'white', fontSize: 20, marginTop: 30 }} onPress={()=>this.props.navigation.navigate('Configuracion')}>Configuraciones</Text>      
            </View>
        )

        return (
            <DrawerLayoutAndroid style={[(darkMode.darkMode) ? styles.containerMenuDark : styles.containerMenu ]} ref={null} drawerWidth={300} drawerPosition={"left"} renderNavigationView={navigationView}>
                
                <View style={[(darkMode.darkMode) ? styles.contenedorDark : styles.contenedor ]}>
                    <Text style={{color: 'white', fontSize: 25}}>  Configuraciones</Text>
                </View>

                <View style={[(darkMode.darkMode) ? styles.containerDark : styles.container ]}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <View>
                                <Text style={[(darkMode.darkMode) ? {color:"white"} : {color:"black"} ]}>Modo oscuro</Text>
                                <this.SwitchDarkMode/>
                            </View>
                            <Text style={[(darkMode.darkMode) ? {color:"white"} : {color:"black"} ]}>Numero de emergencia</Text>
                            <TextInput style={[(darkMode.darkMode) ? styles.inputDark : styles.input ]} defaultValue={darkMode.numeroCelularEmergencia} maxLength={9} placeholder="Ingrese el numero de emergencia" keyboardType={'number-pad'} onChangeText={numeroCelular => this.validarNumero(numeroCelular)}/>
                            <Text style={{ color: "red", width: 300, marginBottom: 5 }}>{numeroCelularTexto}</Text>

                            <View style={{marginBottom: 10, marginTop: 10, width: 300, backgroundColor: '#44494D', padding: 5,}}>
                                <Button title="Guardar" onPress={this.validarGuardado} color="#44494D"/>
                            </View>
                    </View>
                </View>
            </DrawerLayoutAndroid>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },

    container: {
        flex:1,
        padding: 16,
    },

    containerDark: {
        backgroundColor: '#2D323D',
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerMenu: {
        flex: 1,
        padding: 16,
    },

    containerMenuDark: {
        backgroundColor: '#2D323D',
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerPicker: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerPickerDark: {
        backgroundColor: '#2D323D',
        alignItems: 'center',
        justifyContent: 'center',
    },

    navigationContainer: {
        backgroundColor: "#2D323D"
    },
    paragraph: {
        color: 'white',
        padding: 40,
        fontSize: 35
    },
    viewBody:{
        felx: 1,
    },
    btnContainer:{
        position: "absolute",
        bottom: 0,
        left: 100,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5
    },

    input:{
        height: 40,
        width: 300,
        margin: 5, 
        borderWidth: 1,
        padding: 10,
    },

    contenedor:{
        backgroundColor: '#DF2027', marginTop: 50, marginBottom: 10, paddingBottom: 10, paddingTop: 10, width: 720
    },

    contenedorDark:{
        backgroundColor: '#9D1C20', marginTop: 50, marginBottom: 10, paddingBottom: 10, paddingTop: 10, width: 720
    },

    buttonDark: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
    
    navigationContainerDark: {
        backgroundColor: "#2D323D"
    },
    paragraphDark: {
        color: 'white',
        padding: 40,
        fontSize: 35
    },
    viewBodyDark:{
        felx: 1,
    },
    btnContainerDark:{
        position: "absolute",
        bottom: 0,
        left: 100,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5
    },

    inputDark:{
        backgroundColor: "#575A5E", 
        height: 40,
        width: 300,
        margin: 5, 
        borderWidth: 1,
        padding: 10,
    }
});