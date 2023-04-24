import { Image, ActivityIndicator, View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import VariableInput from '../Components/VariableInput'
import axios from 'axios'
import config from '../utils/config'
import ModalPopup from '../Components/ModalPopup'
import Unsuccessful from '../Components/Unsuccessful'


const UseFormula = (props) => {
    const [loading, setLoading] = useState(false)    
    const timerRef = useRef(null);
    const [imageData, setImageData] = useState(null);  
    const [unsuccessful, setUnsuccessful] = useState(false);  

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
            console.log(count);
        }
        
        if (count === 1) {            
            console.log(count)
            // const playload = variables.map((item) => {})
            let varToReplace = null;
            console.log(variables)
            function replaceVariables() {
                // Create a regular expression to match variables in the equation
                const regex = /[a-zA-Z]+(?:_[0-9]+)?/g;
              
                // Replace variables in the equation with values from the variables array
                const replacedEquation = equation.replace(regex, match => {
                  const variable = variables.find(v => v.variableName === match);
                  if (variable) {
                      if (!variable.input.length) {
                        varToReplace = variable.variableName;  
                      }
                    return variable.input || "x"
                  }
                  else {
                    varToReplace = variable.variableName;
                    return "x";
                  }                  
                });
              
                // Return the equation with variables replaced
                return replacedEquation;
            }
                      
            // Make the api request to the solve
            // Add a time out if the API solver is taking too long
            let apiCallFinished = false;
            timerRef.current = setTimeout(() => {
                // The api call can finish before this triggers, so check if the call is already finished.
                if (!apiCallFinished) {                    
                    setLoading(true)                    
                }
            }, 500)         

            const result = replaceVariables();
            console.log(result)
            // Api call
            axios.post(`http://${config.url}:3001/solve`, {data: result})
                .then((response) => {
                    let newVariablesList = [...variables];                    
                    const index = variables.findIndex((v) => v.variableName === varToReplace);                                         
                    newVariablesList[index].input = response.data.result.toString();                    
                    setVariables(newVariablesList);                    
                })
                .catch((error) => {                    
                    console.log(error);
                    setUnsuccessful(true);
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
            setUnsuccessful(true);
            }
        }
        
    
    

  return (
    <View style={styles.container}>
      {loading ? <View style={styles.overlay}><ActivityIndicator size="large"/></View> : <></>}
        <ModalPopup visible={unsuccessful}>
            <Unsuccessful title="Something Went Wrong" message="Looks like FormuLister could not solve
your equation. Make sure you have exactly one unknown variable." emoji="🤔" setUnsuccessful={setUnsuccessful}/>
        </ModalPopup>
      <Text style={styles.title}>Use Formula</Text>  
      <View style={styles.contentContainer}>      
        <View style={styles.imageContainer}>
        <Image source={{uri: imageData}} style={{width: 200, height: 100}}/>
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
            <Text style={styles.solveText}>Solve</Text>
        </View>
      </TouchableOpacity>            
    </View>
    
  )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 50,
        color: "#2F4464",
        fontFamily: "Poppins-SemiBold"
    },
    imageContainer: {        
        borderRadius: 20,
        overflow: "hidden",
        elevation: 5,
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
        backgroundColor: "#1C5BFF",
        borderRadius: 15,
    },  
    solveText: {
        color: "#ffffff",
        fontFamily: "Poppins-Medium",
        fontSize: 15
    },
    contentContainer: {
        width: "100%",
        justifyContent: "center",
        flex: 1,
        alignItems: "center"
    },
    variableBox: {
        marginTop: 30,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        elevation: 5,
        padding: 10,        
        height: 50,
        width: "90%",
        marginBottom: 50,

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