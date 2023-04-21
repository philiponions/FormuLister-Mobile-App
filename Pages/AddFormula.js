import { View, Text, StyleSheet, StatusBar, Touchable, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import VariableInput from '../Components/VariableInput'
import { Alert } from 'react-native';

const AddFormula = () => {
    const [equation, setEquation] = useState("") 
    const [variables, setVariable] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const isMountedRef = useRef(false);

    // Do not trigger the alert if its the first time this page has rendered
    useEffect(() => {
        if (isMountedRef.current && submitted === true) {
            createVerifyAlert()
        }
        else {
            isMountedRef.current = true
        }
    }, [submitted])

    const detectVariables = () => {
        characters = equation.split("")
        console.log(characters)
        const variablesFound = []
        for (let i = 0; i < characters.length; i++) {

            // Regex expression for checking variables
            if (characters[i].match(/^[A-Za-z]+$/) && !variablesFound.includes(characters[i])) {
                console.log("found")
                variablesFound.push(characters[i])
            }
        }
        
        setSubmitted(true)
        setVariable(variablesFound)
    }
    
    const createVerifyAlert = () =>
        Alert.alert('Is this correct?', `FormuLister found the following formula: \n ${equation} \n with variables ${variables}`, [
        {
            text: 'No',
            onPress: () => setSubmitted(false),
            style: 'cancel',
        },
        {text: 'Yes', onPress: () => console.log('OK Pressed')},
        ]);


    const createUnsuccessfulAlert = () =>
        Alert.alert('Parsing Unsuccessful', `Looks like FormuLister could not parse your formula.`, [
        {
            text: 'Dismiss',
            onPress: () => console.log('Cancel Pressed'),
            style: 'dismiss',
        },
        
    ]);


    const processEquation = () => {
        if (equation.length) {
            detectVariables()
        }
        else {
            createUnsuccessfulAlert()
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Formula</Text>
      <View style={styles.contentContainer}>
        <View>
            <Text>Image here</Text>
        </View>
        <Text style={styles.description}>Write you equation below and FormuLister will attempt to parse it</Text>
        <TextInput value={equation} onChangeText={setEquation} multiline={true} numberOfLines={5} style={styles.equationBox}></TextInput>
      </View>

      <TouchableOpacity style={styles.solveButtonContainer} onPress={processEquation}>
        <View style={styles.solveButton}>
            <Text>Add</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 50,
    },
    description: {
        marginTop: 20,
        textAlign: "center"
    },
    equation: {
        fontSize: 30
    },
    solveButtonContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
        
    },
    equationBox: {
        borderWidth: 2,
        width: "80%",
        padding: 10,
        marginTop: 50
    },
    solveButton: {
        width: "80%",
        alignItems: "center",
        paddingVertical: 30,
        backgroundColor: "#00ff00"
    },  
    contentContainer: {
        width: "100%",
        justifyContent: "center",
        flex: 1,
        alignItems: "center"
    },
    variableBox: {
        borderWidth: 2,
        height: 50,
        width: "80%",
        marginBottom: 50        
    },
    equationContainer: {
        padding: 20,
        borderWidth: 2,
        marginBottom: 100
    },
    container: {
          flex: 1,
          marginTop: StatusBar.currentHeight,
          alignItems: "center"
      },
})
export default AddFormula