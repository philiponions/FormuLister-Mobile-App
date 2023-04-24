import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const VariableInput = (props) => {
  const index = props.index;

  // Change the string of the variable thats inside the variables object
  const setTextInput = (text) => {
    // // Make a copy of the variables list
    const newVariablesList = [...props.variables];

    // Set the item's input to the user's input
    newVariablesList[index].input = text
    props.setVariables(newVariablesList)
  }
    
  return (
    <View style={styles.container}>
      <View style={styles.variableContainer}>        
        {/* <Text numberOfLines={1} style={styles.variableText}>{props.variableName}</Text>       */}
        <TextInput
                  placeholder={props.variableName} 
                  value={props.input} 
                   onChangeText={(e) => setTextInput(e)} 
                   style={styles.textInput}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",        
    },
    variableContainer: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
    },
    variableText: {
        width: 40,
        fontSize: 15,                
    },
    textInput: {
        margiHorizontal: 12,        
        backgroundColor: "#EEEEEE",
        borderRadius: 10,
        padding: 10,
        width: "95%",
        fontFamily: "Raleway-Medium"

    }
})

export default VariableInput