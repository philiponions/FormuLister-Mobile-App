import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const VariableInput = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.variableContainer}>        
        <Text style={styles.variableText}>{props.variable} = </Text>      
        <TextInput style={styles.textInput}/>
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