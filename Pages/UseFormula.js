import { Image, ActivityIndicator, View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import VariableInput from '../Components/VariableInput'
import axios from 'axios'
import config from '../utils/config'
import ModalPopup from '../Components/ModalPopup'
import Unsuccessful from '../Components/Unsuccessful'
import { detectVariables, replaceVariables } from '../utils/variables'
import { evaluate } from 'mathjs'


const UseFormula = (props) => {
    const [loading, setLoading] = useState(false)    
    const timerRef = useRef(null);
    const [imageData, setImageData] = useState(null);  
    const [unsuccessful, setUnsuccessful] = useState(false);  
    const [imageLoading, setImageLoading] = useState(false);

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
            setImageLoading(true);
            axios({
                method: 'post',
                url: `${config.solver_url}/render`,
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
                  setImageLoading(false);
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
        }
        
        if (count === 1) {            
            const result = replaceVariables(equation, variables);            
            // Make the api request to the solve
            // Add a time out if the API solver is taking too long
            let apiCallFinished = false;
            timerRef.current = setTimeout(() => {
                // The api call can finish before this triggers, so check if the call is already finished.
                if (!apiCallFinished) {                    
                    setLoading(true)                    
                }
            }, 100)         
                            
            // Api call
            axios.post(`${config.solver_url}/solve`, {data: result})
            .then((response) => {
                const toReplace = variables.find((e) => e.input === "");                                                                        
                const newVariablesList = [...variables];
                const index = variables.findIndex((v) => v.variableName === toReplace.variableName);                                                             
                const answer = evaluate(response.data.result.toString()).toString();                 
                newVariablesList[index].input = answer;                                    
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
        {/* <View style={styles.overlay}><ActivityIndicator size="large"/></View> */}
       {loading ?? <View style={styles.overlay}><ActivityIndicator size="large"/></View>}
        <ModalPopup visible={unsuccessful}>
            <Unsuccessful title="Something Went Wrong" message="Looks like FormuLister could not solve
your equation. Make sure you have exactly one unknown variable." emoji="🤔" setUnsuccessful={setUnsuccessful}/>
        </ModalPopup>
      <Text style={styles.title}>Use Formula</Text>  
      <View style={styles.contentContainer}>      
        <View style={styles.imageContainer}>            
            {imageLoading ? <ActivityIndicator size="large"/> : <Image source={{uri: imageData}} style={styles.image}/>}
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
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    imageContainer: {  
        backgroundColor: "white",
        paddingHorizontal: 5,      
        width: 300,
        height: 100,
        borderRadius: 5,
        elevation: 5,
        justifyContent: "center"
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
        backgroundColor: "#3d3d3d",
        opacity: 0.9,
        zIndex: 1
    },
    container: {
          flex: 1,
          marginTop: StatusBar.currentHeight,
          alignItems: "center"
      },
})
export default UseFormula