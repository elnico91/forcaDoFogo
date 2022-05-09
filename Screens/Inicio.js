import React, { Component } from 'react';
import { DrawerLayoutAndroid, Text, StyleSheet, View, Image, ScrollView } from "react-native"
import { Icon } from 'react-native-elements'
import * as app from '../App'

var codigoGlobal = '';
var nombreGlobal = '';
var tipoGlobal = '';
var validarBoolean = '';
export var darkMode = false;
export var numeroCelularEmergencia = 0;

export default class Inicio extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
        }
    }

    constructor(props) {
        super(props);
        this.RecuperarConfig()
        this.Dispositivos()
        this.state = {
            isReady: false,
            listadoDispositivos:[],
            listadoConfig:[]
      };
    };

    RecuperarConfig = () => {

        fetch('', { // Base de datos borrada
        method:'POST',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            RUT: app.RUT_GLOBAL
        })     
        }).then((respuesta)=> respuesta.json()).then((responseJson) => {         
            if(responseJson == "No"){             

            }else{
                this.setState({listadoConfig:responseJson})
                this.state.listadoConfig.map(item =>(
                    validarBoolean = item.modoOscuro,  
                    numeroCelularEmergencia = item.contactoDeEmergencias          
                ))     
                
                if (validarBoolean == 0) {
                    darkMode = false
                } else {
                    darkMode = true
                }
                
            }
      }).catch((error)=> {
            alert("Error, por favor pornerse en contacto con el soporte");
      })

    }

    Dispositivos = () => {

        fetch('', { // Base de datos borrada
        method:'POST',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            RUT: app.RUT_GLOBAL
        })     
        }).then((respuesta)=> respuesta.json()).then((responseJson) => {
            if(responseJson == "No"){     
                alert('No se encuentra ningun dispositivo, por favor agrege uno')
            }else{
                this.setState({listadoDispositivos:responseJson})
                this.state.listadoDispositivos.map(item =>(
                    codigoGlobal = item.idDispositivo,
                    nombreGlobal = item.nombreDispositivo,
                    tipoGlobal = item.tipo
                ))
                this.tipo()
                this.AlertaRandom()
            }
      }).catch((error)=> {
            alert("Error, por favor pornerse en contacto con el soporte");
      })

    }

    AlertaRandom = () => {
        var min = 1;
        var max = 1000;
        var Rand =  min + (Math.random() * (max-min));
        if(Math.round(Rand) >= 900){
                fetch('', { // Base de datos borrada
                method:'POST',
                header:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    codigo: codigoGlobal
                })     
                }).then((respuesta)=> respuesta.json()).then((responseJson) => {
                    if(responseJson == "No"){     
                    }else{
                        alert(tipoGlobal + " " + nombreGlobal + " ha generado una alerta, por favor revisarla")
                    }
                }).catch((error)=> {
                })
        }
    }

    tipo(){
        if (tipoGlobal = 0) {
            tipoGlobal = 'El Sensor'
        } else {
            tipoGlobal = 'La Alarma'
        }
    }

    render(){
        this.RecuperarConfig()
        const navigationView = () => (
            <View style={[styles.container, styles.navigationContainer]}>
                <View style={{ flexDirection: "row" }}>
                    <Image source={require('../assets/avatar.png')} style={{ marginTop: 35, width: 60, height: 60, }} />
                    <Text style={styles.paragraph}>Usuario</Text>
                </View>
                <Text style={{ color: 'white', fontSize: 20, marginTop: 15 }} onPress={()=>this.props.navigation.navigate('Inicio')}>Dispositivos</Text>
                <Text style={{ color: '#5D6575', fontSize: 20, marginTop: 30 }} onPress={()=>this.props.navigation.navigate('Logs')}>Registros</Text>
                <Text style={{ color: '#5D6575', fontSize: 20, marginTop: 30 }} onPress={()=>this.props.navigation.navigate('Tiendas')}>Nuestras Tiendas</Text>    
                <Text style={{ color: '#5D6575', fontSize: 20, marginTop: 30 }} onPress={()=>this.props.navigation.navigate('Configuracion')}>Configuraciones</Text>            
            </View>
        )
        
        if(this.state.listadoDispositivos.length === 0){
            return (
                <DrawerLayoutAndroid style={[(darkMode) ? styles.containerDark : styles.container ]} ref={null} drawerWidth={300} drawerPosition={"left"} renderNavigationView={navigationView}>
                    <View style={[(darkMode) ? styles.contenedorDark : styles.contenedor ]}>
                            <Text style={{color: 'white', fontSize: 25}}>  Listado de Dispositivos</Text>
                    </View>

                    <View style={[(darkMode) ? styles.dispositivosDark : styles.dispositivos ]}>
                        <View style={[(darkMode) ? styles.dispositivosGeneralesDark : styles.dispositivosGenerales ]}>
                            <Text style={[(darkMode) ? {color:"white"} : {color:"black"} ]}>Sin dispositivos registrados</Text>                   
                        </View>
                    </View>

                    <ScrollView>
                    </ScrollView>

                    <View style={styles.viewBody, {flexDirection: "row"}}>
                            <Icon type="material-community" name="reload" color="#2D323D" reverse containerStyle={styles.btnContainer2} onPress={this.Dispositivos}/>
                            <Icon type="material-community" name="plus" color="#2D323D" reverse containerStyle={styles.btnContainer} onPress={()=>this.props.navigation.navigate('RegistroDispositivos')}/>
                    </View>
                </DrawerLayoutAndroid>
            )
        }else{
            return (
                <DrawerLayoutAndroid style={[(darkMode) ? styles.containerDark : styles.container ]} ref={null} drawerWidth={300} drawerPosition={"left"} renderNavigationView={navigationView}>
                    <View style={[(darkMode) ? styles.contenedorDark : styles.contenedor ]}>
                            <Text style={{color: 'white', fontSize: 25}}>  Listado de Dispositivos</Text>
                    </View>

                    <View style={[(darkMode) ? styles.dispositivosDark : styles.dispositivos ]}>
                        <View style={[(darkMode) ? styles.dispositivosGeneralesDark : styles.dispositivosGenerales ]}>
                                <ScrollView> 
                                    {this.state.listadoDispositivos.map(item =>(
                                        codigoGlobal = item.idDispositivo,
                                        <Text style={[(darkMode) ? {color:"white"} : {color:"black"} ]}>{item.nombreDispositivo}  {item.nivelBateria} %
                                        </Text> 
                                  ))}
                                </ScrollView>                     
                        </View>
                    </View>

                    <ScrollView>

                        {this.state.listadoDispositivos.map(item =>(
                            <View style={[(darkMode) ? styles.containerRDark : styles.containerR ]}>
                                
                                <View style={[(darkMode) ? styles.cardViewDark : styles.cardView ]}>
                                    <Text style={[(darkMode) ? {color:"white"} : {color:"black"} ]}>{item.nombreDispositivo}  {item.nivelBateria} %
                                    </Text>
                                </View>   
                                                    
                            </View>
                        ))}

                    </ScrollView>

                    <View style={styles.viewBody, {flexDirection: "row"}}>
                        <Icon type="material-community" name="reload" color="#2D323D" reverse containerStyle={styles.btnContainer2} onPress={this.Dispositivos}/>
                        <Icon type="material-community" name="plus" color="#2D323D" reverse containerStyle={styles.btnContainer} onPress={()=>this.props.navigation.navigate('RegistroDispositivos')}/>
                    </View>

                </DrawerLayoutAndroid>
            )
        }
    }
}

const styles = StyleSheet.create({
    contenedor:{
        backgroundColor: '#DF2027', marginTop: 50, marginBottom: 10, paddingBottom: 10, paddingTop: 10, width: 720
    },

    contenedorDark:{
        backgroundColor: '#9D1C20', marginTop: 50, marginBottom: 10, paddingBottom: 10, paddingTop: 10, width: 720
    },

    dispositivos:{
        top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' 
    },

    dispositivosDark:{
        backgroundColor: '#2D323D', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' 
    },

    container: {
        flex: 1,
        padding: 16
    },

    containerDark: {
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

    viewBody: {
        flex: 1,
    },

    btnContainer:{
        position: "absolute",
        bottom: 0,
        left: 290,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5
    },

    btnContainer2:{
        position: "absolute",
        bottom: 60,
        left: 290,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5
    },

    containerR:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerRDark:{
        flex: 1,
        backgroundColor: '#2D323D',
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardView: {
        backgroundColor: "white",
        borderRadius: 5,
        marginVertical:5,
        marginTop: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center', 
        alignItems: 'center'
    },

    cardViewDark: {
        backgroundColor: "#232833",
        borderRadius: 5,
        marginVertical:5,
        marginTop: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center', 
        alignItems: 'center'
    },

    dispositivosGenerales:{
        backgroundColor: "white",
        borderRadius: 10,
        marginVertical:5,
        marginTop:15,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 150,
        width: 300,
        justifyContent: 'center', 
        alignItems: 'center'
    },

    dispositivosGeneralesDark:{
        backgroundColor: "#232833",
        borderRadius: 10,
        marginVertical:5,
        marginTop:15,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 150,
        width: 300,
        justifyContent: 'center', 
        alignItems: 'center'
    }
});