import React, { Component, useState } from 'react';
import { StyleSheet, Text, View,Button, TextInput, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';

var rutTexto = ""
var nombreTexto = ""
var apellidoTexto = ""
var correoTexto = ""
var contrasenaTexto = ""
var numeroCelularTexto = ""
var direccionTexto = ""

var rutValidar = false
var nombreValidar = false
var apellidoValidar = false
var correoValidar = false
var contrasenaValidar = false
var numeroCelularValidar = false
var direccionValidar = false

export default class RegistrarCuenta extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
        }
    }
    
    constructor(props) {
        super(props);
        this.Region()
        this.state = {
            isReady: false,
            RUT:'',
            nombre:'',
            apellido:'',
            numeroCelular:'',
            correo:'',
            contrasena:'',
            direccion:'',
            idRegion:'',
            idProvincia:'',
            idComuna:'',
            listadoRegion:[],
            listadoProvincia:[],
            listadoComuna:[]
          };
      };

    Registrar = () => {
      const {RUT} = this.state;
      const {nombre} = this.state;
      const {apellido} = this.state;
      const {numeroCelular} = this.state;
      const {correo} = this.state;
      const {contrasena} = this.state;
      const {idComuna} = this.state;
      const {direccion} = this.state;

      fetch('', { // Base de datos borrada
        method:'POST',
        header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          RUT: RUT,
          nombre: nombre,
          apellido: apellido,
          numeroCelular: numeroCelular,
          correo: correo,
          contrasena: contrasena,
          idComuna: idComuna,
          direccion: direccion,
        })
      }).then((respuesta)=> respuesta.text()).then((responseJson) => {
            if(responseJson == "No Registrado"){     
                alert('Hubo un error al registrarse, revise los datos o intentelo de nuevo')
            }else{
                alert('Cuenta registrada correctamente');
                this.props.navigation.navigate('Login')
            }                
      }).catch((error)=> {
            alert(error)
      })
    
    }

    Region = () => {

        fetch('', { // Base de datos borrada
        method:'GET',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
        }).then((respuesta)=> respuesta.json()).then((responseJson) => {
            if(responseJson == "No"){
                alert('Error, no se han podido cargar las Regiones')
            }else{
                this.setState({listadoRegion:responseJson})
            }
      }).catch((error)=> {
            alert("Error, por favor pornerse en contacto con el soporte1");
      })

    }

    Provincia = () => {
        const {idRegion} = this.state;

        fetch('', { // Base de datos borrada
        method: 'POST',
        header: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
          idRegion: idRegion
        })
        }).then((respuesta)=> respuesta.json()).then((responseJson) => {
            if(responseJson == "No"){
                alert('Error, no se han podido cargar las Provincias')
            } else {
                this.setState({listadoProvincia:responseJson})
            }
      }).catch((error)=> {
            alert("Error, por favor pornerse en contacto con el soporte2");
      })
    }

    Comuna = () => {
        const {idProvincia} = this.state;

        fetch('', { // Base de datos borrada
        method: 'POST',
        header: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
          idProvincia: idProvincia
        })
        }).then((respuesta)=> respuesta.json()).then((responseJson) => {
            if(responseJson == "No"){
                alert('Error, no se han podido cargar las Comunas')
            }else{
                this.setState({listadoComuna:responseJson})
            }
      }).catch((error)=> {
            //alert("Error, por favor pornerse en contacto con el soporte3");
      })

    }

    PickerRegion = () => {
        const [selectedValue, setSelectedValue] = useState();
        return (
          <View style={styles.container}>
            <Picker
                selectedValue={selectedValue}
                style={{ width: 300, height: 40, margin: 5, borderWidth: 1, padding: 10, marginBottom: 5 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(this.cambiarProvincia(itemValue))}
            >
                {this.state.listadoRegion.map(item =>(
                    <Picker.Item label={item.nombreRegion} value={item.idRegion}/>                
                ))}
            </Picker> 
          </View>
        );
    }

    cambiarProvincia(itemValue) {
        this.state.idRegion = itemValue
        this.Provincia()
        return itemValue
    }

    PickerProvincia = () => {
        const [selectedValue, setSelectedValue] = useState();
        return (
          <View style={styles.container}>
            <Picker
            selectedValue={selectedValue}
            style={{ width: 300, height: 40, margin: 5, borderWidth: 1, padding: 10, marginBottom: 5 }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(this.cambiarComuna(itemValue))}
            >
                {this.state.listadoProvincia.map(item =>(
                    <Picker.Item label={item.nombreProvincia} value={item.idProvincia} />
                ))}
            </Picker> 
          </View>
        );
    }

    cambiarComuna(itemValue) {
        this.state.idProvincia = itemValue
        this.Comuna()
        return itemValue
    }

    PickerComuna = () => {
        const [selectedValue, setSelectedValue] = useState();
        return (
            <View style={styles.container}>
                <Picker
                selectedValue={selectedValue}
                style={{ width: 300, height: 40, margin: 5, borderWidth: 1, padding: 10, marginBottom: 5 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(this.valorComuna(itemValue))}
                >
                    {this.state.listadoComuna.map(item =>(
                        <Picker.Item label={item.nombreComuna} value={item.idComuna} />
                    ))}
                </Picker> 
            </View>
            );
    }

    valorComuna(itemValue) {
        this.state.idComuna = itemValue
        return itemValue
    }

    validarRUT = (RUT) => {

        var RUTlenght = "" + ~~RUT

        if (RUTlenght.length == 8 || RUTlenght.length == 9){
            this.state.RUT = RUT
            rutTexto = ""
            rutValidar = true
        } else {
            rutTexto = "Verifique el rut, no puede tener punto ni guion, remplace la k por un 0 "
            rutValidar = false
        }
        this.Comuna()
    }

    validarNombre = (nombre) => {
        if (nombre.length > 0) {
            this.state.nombre = nombre
            nombreTexto = ""
            nombreValidar = true
        } else {
            nombreTexto = "Nombre no puede estar vacio"
            nombreValidar = false
        }
        this.Comuna()
    }

    validarApellido = (apellido) => {
        if (apellido.length > 0) {
            this.state.apellido = apellido
            apellidoTexto = ""
            apellidoValidar = true
        } else {
            apellidoTexto = "Apellido no puede estar vacio"
            apellidoValidar = false
        }
        this.Comuna()
    }

    validarCorreo = (correo) => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        
        if(reg.test(correo) === false){
            correoTexto = "Correo incorrecto, ingrese un correo valido"
            correoValidar = false
        }
        else {
            this.state.correo = correo
            correoTexto = ""
            correoValidar = true
        }
        this.Comuna()
    }

    validarContrasena = (contrasena) => {
        if (contrasena.length > 0) {
            this.state.contrasena = contrasena
            contrasenaTexto = ""
            contrasenaValidar = true
        } else {
            contrasenaTexto = "Contraseña no puede estar vacia"
            contrasenaValidar = false
        }
        this.Comuna()
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
        this.Comuna()
    }

    validarDireccion = (direccion) => {
        if (direccion.length > 0) {
            this.state.direccion = direccion
            direccionTexto = ""
            direccionValidar = true
        } else {
            direccionTexto = "Direccion no puede estar vacio"
            direccionValidar = false
        }
        this.Comuna()
    }

    validarEnviar = () => {
        
        var contador = 0

        if (rutValidar) {
            contador += 1
        } else {
            this.validarRUT(0)
        }
        
        if (nombreValidar) {
            contador += 1
        } else {
            this.validarNombre("")
        }
        
        if (apellidoValidar) {
            contador += 1
        } else {
            this.validarApellido("")
        }

        if (correoValidar) {
            contador += 1
        } else {
            this.validarCorreo("")
        }
        
        if (contrasenaValidar) {
            contador += 1
        } else {
            this.validarContrasena("")
        }
        
        if (numeroCelularValidar) {
            contador += 1
        } else {
            this.validarNumero(0)
        }
        
        if (direccionValidar) {
            contador += 1
        } else {
            this.validarDireccion("")
            alert("Direccion no puede estar vacio")
        }

        if (contador == 7 ) {
            this.Registrar()
        } else {
            alert("Por favor verique los datos de registro ")
            this.Comuna()
        }

    }

    render(){
        return(
            
            <View>
                
                <View style={{backgroundColor: '#DF2027', marginTop: 50, marginBottom: 10, paddingBottom: 10, paddingTop: 10, width: 720}}>
                    <Text style={{color: 'white', fontSize: 25}}>  Registrar Cuenta</Text>
                </View>
                
                <View style={styles.container}>
                    <View style={{ height: 625 }}>
                        <ScrollView>
                            <Text>RUT</Text>
                            <TextInput style={styles.input} maxLength={9} placeholder="RUT sin puntos ni guion, si es una k, remplazar por un 0" keyboardType={'number-pad'} onChangeText={RUT => this.validarRUT(RUT)}/>
                            <Text style={{ color: "red", width: 300, marginBottom: 5 }}>{rutTexto}</Text>

                            <Text>Nombre</Text>
                            <TextInput style={styles.input} placeholder="Ingrese su nombre" onChangeText={nombre => this.validarNombre(nombre)}/>
                            <Text style={{ color: "red", width: 300, marginBottom: 5 }}>{nombreTexto}</Text>

                            <Text>Apellido</Text>
                            <TextInput style={styles.input} placeholder="Ingrese su apellido"  onChangeText={apellido => this.validarApellido(apellido)}/>
                            <Text style={{ color: "red", width: 300, marginBottom: 5 }}>{apellidoTexto}</Text>

                            <Text>Correo</Text>
                            <TextInput style={styles.input} placeholder="Ingrese su correo" keyboardType={'email-address'} onChangeText={correo => this.validarCorreo(correo)}/>
                            <Text style={{ color: "red", width: 300, marginBottom: 5 }}>{correoTexto}</Text>
        
                            <Text>Contraseña</Text>
                            <TextInput style={styles.input} placeholder="Ingrese su contraseña" secureTextEntry={true} onChangeText={contrasena => this.validarContrasena(contrasena)}/>
                            <Text style={{ color: "red", width: 300, marginBottom: 5 }}>{contrasenaTexto}</Text>

                            <Text>Numero Celular</Text>
                            <TextInput style={styles.input} maxLength={9} placeholder="Ingrese su numero celular" keyboardType={'number-pad'} onChangeText={numeroCelular => this.validarNumero(numeroCelular)}/>
                            <Text style={{ color: "red", width: 300, marginBottom: 5 }}>{numeroCelularTexto}</Text>

                            <Text>Region</Text>                          
                            <this.PickerRegion/>
                            
                            <Text>Provincia</Text>
                            <this.PickerProvincia/>

                            <Text>Comuna</Text>
                            <this.PickerComuna/>
            
                            <Text>Direccion</Text>
                            <TextInput style={styles.input} placeholder="Ingrese su direccion" onChangeText={direccion => this.validarDireccion(direccion)}/>
                            <Text style={{ color: "red", width: 300, marginBottom: 5 }}>{direccionTexto}</Text>

                            <View style={{marginBottom: 10, marginTop: 10, width: 300, backgroundColor: '#44494D', padding: 5,}}>
                                <Button title="Crear Cuenta" onPress={this.validarEnviar} color="#44494D"/>
                            </View>
                        </ScrollView>
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
    }
});