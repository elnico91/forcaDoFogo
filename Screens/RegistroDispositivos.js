import React, {Component, useState} from 'react';
import { StyleSheet, Text, View,Button, TextInput, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import * as app from '../App'
import * as darkMode from './Inicio'

var nombreDispositivoTexto = ""
var nombreUbicacionTexto = ""
var validarDispositivo = false
var validarUbicacion = false

export default class RegistroDispositivos extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
        }
    }
    
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            nombreDispositivo:'', 
            nombreUbicacion:'',
            tipo:0,
            RUT:'',     
      };
    }
    
    agregarDispositivos = () => {
      const {nombreDispositivo} = this.state;   
      const {nombreUbicacion} = this.state;
      const {tipo} = this.state;
      const {RUT} = this.state;
      
      fetch('', { // Base de datos borrada
        method:'POST',
        header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          nombreDispositivo: nombreDispositivo,
          nombreUbicacion: nombreUbicacion,
          tipo: tipo,
          RUT: app.RUT_GLOBAL,      
        })
      }).then((respuesta)=> respuesta.json()).then((responseJson) => {
            if(responseJson == "Usuario Registrado"){
                alert("Se ha registrado el dispositivo correctamente ");
                this.props.navigation.navigate('Inicio')
            }else{
                alert("nombreDispositivo " + nombreDispositivo + " nombreUbicacion " + nombreUbicacion + " tipo " + tipo + " RUT " + app.RUT_GLOBAL)
                alert("Hubo un error al ingresar el dispositivo, por favor revise los datos o intentelo mas tarde ")
            }            
      }).catch((error)=> {
            alert('Hubo un error al ingresar el dispositivo, por favor revise los datos o intentelo mas tarde ')
      })
    
    }

    PickerTipo = () => {
        const [selectedValue, setSelectedValue] = useState();
        return (
            <View style={styles.container}>
                <Picker
                selectedValue={selectedValue}
                style={ [(darkMode.darkMode) ? styles.pickerDark : styles.picker ]}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(this.valorTipo(itemValue))}
                >
                    <Picker.Item label="Sensor" value={0} />
                    <Picker.Item label="Alarma" value={1} />
                </Picker> 
            </View>
        );
    }

    valorTipo(itemValue) {
        this.state.tipo = itemValue
        return itemValue
    }

    validarNombreDispositivo = (nombre) => {
        if (nombre.length > 0) {
            this.state.nombreDispositivo = nombre
            nombreDispositivoTexto = ""
            validarDispositivo = true
        } else {
            nombreDispositivoTexto = "Nombre Dispositivo no puede estar vacio"
            validarDispositivo = false
        }
        
    }

    validarNombreUbicacion = (nombre) => {
        if (nombre.length > 0) {
            this.state.nombreUbicacion = nombre
            nombreUbicacionTexto = ""
            validarUbicacion = true
        } else {
            nombreUbicacionTexto = "Nombre Ubicacion no puede estar vacio"
            validarUbicacion = false
        }
        
    }

    validarEnviar = () => {
        var contador = 0
        
        if (validarDispositivo) {
            contador += 1
        }

        if (validarUbicacion) {
            contador += 1
        }

        if (contador == 2) {
            this.agregarDispositivos()
        } else {
            alert("No pueden haber campos vacios, por favor verifique los campos")
        }

    }

    render(){    

        return(
            <View style={[(darkMode.darkMode) ? {height: 1000, backgroundColor: "#2D323D"} : {backgroundColor: "#fff"} ]}>

                <View style={[(darkMode.darkMode) ? styles.contenedorDark : styles.contenedor ]}>
                    <Text style={{color: 'white', fontSize: 25}}>  Agregar Dispositivos</Text>
                </View>

                <View style={[(darkMode.darkMode) ? styles.containerDark : styles.container ]}>
                
                        <Text style={[(darkMode.darkMode) ? {color:"white"} : {color:"black"} ]}>Nombre del dispositivo</Text>
                        <TextInput style={[(darkMode.darkMode) ? styles.inputDark : styles.input ]} placeholder="Ingrese el codigo dispositivo" onChangeText={nombreDispositivo => this.validarNombreDispositivo(nombreDispositivo)}/>
                        <Text style={{ color: "red", width: 300, marginBottom: 5 }}>{nombreDispositivoTexto}</Text>
                    
                        <Text style={[(darkMode.darkMode) ? {color:"white"} : {color:"black"} ]}>Ubicacion en el hogar</Text>
                        <TextInput style={[(darkMode.darkMode) ? styles.inputDark : styles.input ]} placeholder="Ingrese el nombre" onChangeText={nombreUbicacion => this.validarNombreUbicacion(nombreUbicacion)}  />
                        <Text style={{ color: "red", width: 300, marginBottom: 5 }}>{nombreUbicacionTexto}</Text>
                                    
                        <Text style={[(darkMode.darkMode) ? {color:"white"} : {color:"black"} ]}>Sensor o alarma</Text>
                        <this.PickerTipo/>
                    

                    <View style={{marginBottom: 10, marginTop: 10, width: 300, backgroundColor: '#44494D', padding: 5,}}>
                        <Button title="Agregar Dispositivo" onPress={this.validarEnviar} color="#44494D"/>
                    </View>
                    
                </View>

            </View>
        )  
    }
}

const styles = StyleSheet.create({  
    picker:{
        backgroundColor: "#fff",
        width: 300, 
        height: 40, 
        borderWidth: 1,
    },

    pickerDark:{
        backgroundColor: "#575A5E",
        width: 300, 
        height: 40, 
        borderWidth: 1,
    },
    
    container:{
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerDark:{
        backgroundColor: '#2D323D',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    contenedor: {
        backgroundColor: '#DF2027',
        marginTop: 50, 
        marginBottom: 10, 
        paddingBottom: 10, 
        paddingTop: 10, 
        width: 720, 
    },

    contenedorDark: {
        backgroundColor: '#9D1C20',
        marginTop: 50, 
        marginBottom: 10, 
        paddingBottom: 10, 
        paddingTop: 10, 
        width: 720, 
    },
  
    text:{
        color: 'white',
        padding: 5,
        fontSize: 15,
    },
  
    input:{
        height: 40,
        width: 300,
        margin: 5, 
        borderWidth: 1,
        padding: 10,
    },

    inputDark:{
        backgroundColor: "#575A5E", 
        height: 40,
        width: 300,
        margin: 5, 
        marginTop: 10,
        marginBottom: 10, 
        borderWidth: 1,
        padding: 10,
    }
});