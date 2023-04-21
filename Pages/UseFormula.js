import { View, Text, StyleSheet, StatusBar, Touchable, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import VariableInput from '../Components/VariableInput'
import axios from 'axios'

const UseFormula = (props) => {
    const [variables, setVariables] = useState(props.selectedFormula.variables.map((v) => {
        return {
            input: '',
            variableName: v
        }
    }));
    
    const expression = props.selectedFormula.expression;
    // Sends the equation and the current values in the text
    const sendEquation = () => {
        
        // Count how many variables arent filled. There should only be
        // exactly one variable unknown
        let count = 0;
        for (i = 0; i < variables.length; i++) {
            if (variables[i].input.length === 0) {
                count++;
            }

        if (count === 1) {            

            // Get a new list variables that have values filled out
            const variablesFilled = variables.filter((v) => v.input.length > 0 )                        
            
            let result = ""
            let j = 0 // 

            // Loop through expression string
            for (let i = 0; i < expression.length; i++) {
                const letter = expression[i];
                const variableFound = variablesFilled.find(v => v.variableName === letter);
                
                // If the variable was found then replace it with user's input
                if (variableFound) {
                    result += variablesFilled[j].input;
                    
                    // Increment j to iterate through the next filled variable
                    j++;
                }                 
                else {
                    
                    // Otherwise just use the original character
                    result += letter;
                }
            }
            
            // Replace that variable to x for the API to solve
            
            result = result.replace(/[a-zA-Z]/g, "x");    

            // Make the api request to the solve
            axios.post("http://10.0.2.2:5000/solve", {data: result})
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {                    
                    console.log(error);
                })            
        }
        else {
            // If zero, then are no variables that arent filled
            // If more than one, there are too many that arent filled
            console.log("Not one")
            }
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Use Formula</Text>
      <View style={styles.contentContainer}>
        <View style={styles.equationContainer}>
            <Text style={styles.equation}>{expression}</Text>
        </View>
        <ScrollView style={styles.variableBox}>
            {variables.map((v, index) => {
                return <VariableInput key = {index}
                                      setVariables={setVariables} 
                                      variables={variables}
                                      input={v.input}
                                      index={index} 
                                      variableName={v.variableName}/>
            })}            
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.solveButtonContainer} onPress={sendEquation}>
        <View style={styles.solveButton}>
            <Text>Solve</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 50,
    },
    equation: {
        fontSize: 30
    },
    solveButtonContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
        
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
export default UseFormula