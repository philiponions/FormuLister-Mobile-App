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

    console.log(newVariablesList)
    props.setVariables(newVariablesList)
  }
    
  return (
    <View style={styles.container}>
      <View style={styles.variableContainer}>        
        <Text style={styles.variableText}>{props.variableName} = </Text>      
        <TextInput value={props.input} 
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
        marginTop: 10
    },
    variableText: {
        width: 40
    },
    textInput: {
        margiHorizontal: 12,        
        borderWidth: 1,
        padding: 10,
        width: "80%",

    }
})

export default VariableInput