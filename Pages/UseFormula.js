import { Image, ActivityIndicator, View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import VariableInput from '../Components/VariableInput'
import axios from 'axios'
import config from '../Utils.js/config'


const UseFormula = (props) => {
    const [loading, setLoading] = useState(false)    
    const timerRef = useRef(null);
    const [imageData, setImageData] = useState(null);

    const [variables, setVariables] = useState(props.selectedFormula.variables.map((v) => {
        return {
            input: '',
            variableName: v
        }
    }));

    useEffect(() => {        
        // Check if the image has been cached to prevent unecessary calls to api.
        if (props.cache[props.selectedFormula.id]) {                        
            setImageData(props.cache[props.selectedFormula.id]);   
        } else {
            axios({
                method: 'post',
                url: `http://${config.url}:3001/render`,
                responseType: 'arraybuffer', // Receive binary response
                headers: {
                  'Content-Type': 'application/json',              
                },
                data: {
                  data: props.selectedFormula.equation
                },
              })
                .then(response => {                    
                  // Convert the binary data to a base64-encoded string
                  const base64Image = `data:image/png;base64,${response.request._response.toString('base64')}`;
                  let newCache = props.cache;
                  newCache[props.selectedFormula.id] = base64Image;
                  props.setCache(newCache);
                  setImageData(base64Image);              
                })
                .catch(error => {
                  console.error(error);
                  createErrorAlert(error);
                });
            }
        }, []);

      
    
    const createErrorAlert = () =>
        Alert.alert('Error', 'Something went wrong', [
        {
            text: 'OK',
            onPress: () => console.log('Ok'),
        },
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },      
        ]);

    const equation = props.selectedFormula.equation;

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

            // Loop through equation string
            for (let i = 0; i < equation.length; i++) {
                const letter = equation[i];
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
            const replacementIndex = result.search(/[a-zA-Z]/);
            const varToReplace = result[replacementIndex];          
            result = result.replace(varToReplace, "x");              

            // Make the api request to the solve
            // Add a time out if the API solver is taking too long
            let apiCallFinished = false;
            timerRef.current = setTimeout(() => {
                // The api call can finish before this triggers, so check if the call is already finished.
                if (!apiCallFinished) {                    
                    setLoading(true)                    
                }
            }, 500)         

            // Api call
            axios.post(`http://${config.url}:3001/solve`, {data: result})
                .then((response) => {
                    let newVariablesList = [...variables];                    
                    console.log("var to replace", varToReplace);
                    const index = variables.findIndex((v) => v.variableName === varToReplace);                     
                    console.log(index)
                    // newVariablesList[index].input = response.data.result.toString();                    
                    // setVariables(newVariablesList)
                })
                .catch((error) => {                    
                    console.log(error);
                    createErrorAlert(error);
                })   
                .finally(() => {                    
                    apiCallFinished = true;
                    setLoading(false);                    
                    clearTimeout(timerRef.current);
                })         
        }
        else {
            // If zero, then are no variables that arent filled
            // If more than one, there are too many that arent filled
            // createErrorAlert()
            console.log("This");
            console.log("Something went wrong!");
            }
        }
    }

  return (
    <View style={styles.container}>
      {loading ? <View style={styles.overlay}><ActivityIndicator size="large"/></View> : <></>}
      <Text style={styles.title}>Use Formula</Text>  
      <View style={styles.contentContainer}>        
        <Image source={{uri: imageData}} style={{width: 300, height: 100}}/>
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
    overlay: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
        opacity: 0.9,
    },
    container: {
          flex: 1,
          marginTop: StatusBar.currentHeight,
          alignItems: "center"
      },
})
export default UseFormula