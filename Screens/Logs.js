import React, {Component} from 'react';
import { StyleSheet, DrawerLayoutAndroid, Text, View, Image, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements'

import * as app from '../App'
import * as darkMode from './Inicio'

export default class Logs extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
        }
    }

    constructor(props) {
        super(props);
        this.Registros()
        this.state = {
            isReady: false,
            listadoRegistros:[]
      };
    }

    Registros = () => {

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
                alert('No se encuentra ningun registo hasta el momento')
            }else{
                this.setState({listadoRegistros:responseJson})
            }
      }).catch((error)=> {
            alert("Error, por favor pornerse en contacto con el soporte");
      })

    }

    render(){

        const navigationView = () => (
            <View style={[styles.container, styles.navigationContainer]}>
                <View style={{ flexDirection: "row" }}>
                    <Image source={require('../assets/avatar.png')} style={{ marginTop: 35, width: 60, height: 60, }} />
                    <Text style={styles.paragraph}>Usuario</Text>
                </View>
                <Text style={{ color: '#5D6575', fontSize: 20, marginTop: 15 }} onPress={()=>this.props.navigation.navigate('Inicio')}>Dispositivos</Text>
                <Text style={{ color: 'white', fontSize: 20, marginTop: 30 }} onPress={()=>this.props.navigation.navigate('Logs')}>Registros</Text>
                <Text style={{ color: '#5D6575', fontSize: 20, marginTop: 30 }} onPress={()=>this.props.navigation.navigate('Tiendas')}>Nuestras Tiendas</Text>    
                <Text style={{ color: '#5D6575', fontSize: 20, marginTop: 30 }} onPress={()=>this.props.navigation.navigate('Configuracion')}>Configuraciones</Text>
            </View>
        )
        
        if(this.state.listadoRegistros.length === 0){
            return (
                <DrawerLayoutAndroid style={[(darkMode.darkMode) ? styles.containerDark : styles.container ]} ref={null} drawerWidth={300} drawerPosition={"left"} renderNavigationView={navigationView}>
                    
                    <View style={[(darkMode.darkMode) ? styles.contenedorDark : styles.contenedor ]}>
                        <Text style={{color: 'white', fontSize: 25}}>  Listado de Registros</Text>
                    </View>

                    <View style={styles.viewBody}>        
                        <Icon type="material-community" name="reload" color="#2D323D" reverse containerStyle={styles.btnContainer} onPress={this.Registros}/>
                    </View>

                </DrawerLayoutAndroid>
            )
        }else{
            return (
                <DrawerLayoutAndroid style={[(darkMode.darkMode) ? styles.containerDark : styles.container ]} ref={null} drawerWidth={300} drawerPosition={"left"} renderNavigationView={navigationView}>
                    
                    <View style={[(darkMode.darkMode) ? styles.contenedorDark : styles.contenedor ]}>
                        <Text style={{color: 'white', fontSize: 25}}>  Listado de Registros</Text>
                    </View>

                    <ScrollView>
                        {this.state.listadoRegistros.map(item =>(
                            <View style={[(darkMode.darkMode) ? styles.containerRDark : styles.containerR ]}>
                                    
                                <View style={[(darkMode.darkMode) ? styles.cardViewDark : styles.cardView ]}> 
                                    <Text style={[(darkMode.darkMode) ? {color:"white"} : {color:"black"} ]}>ID: {item.idRegistro} / {item.fechaRegistro} / {item.nombreDispositivo}: {item.descripcion} </Text>
                                </View>
                                    
                            </View>
                        ))}
                    </ScrollView>

                    <View style={styles.viewBody, {flexDirection: "row"}}>
                        <Icon type="material-community" name="reload" color="#2D323D" reverse containerStyle={styles.btnContainer} onPress={this.Registros}/>
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
    }
});