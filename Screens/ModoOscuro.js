import React, { useState } from "react";
import { render } from "react-dom";
import { View, Switch, StyleSheet } from "react-native";

export var modo = true;



export const App = () => {
    const [mode, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    function changestate(){
        if(mode == true){
            modo = true
        }else{
            modo = false
        }
    }
    return (
        <View style={styles.container}>
        <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={mode ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={mode}
            onChange={changestate}
        />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  botton1Dark:{marginBottom: 10, 
    marginTop: 10, 
    width: 300, 
    backgroundColor: '#D6E5F1', 
    padding: 5},

  botton1Light:{marginBottom: 10, 
      marginTop: 10, 
      width: 300, 
      backgroundColor: '#44494D', 
      padding: 5},
});

export default App;