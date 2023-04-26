import { View, Text, StyleSheet, StatusBar, Touchable, TouchableOpacity, ScrollView, TextInput, Image, KeyboardAvoidingView, useWindowDimensions, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import VariableInput from '../Components/VariableInput'
import { Alert } from 'react-native';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import config from '../utils/config';
import ModalPopup from '../Components/ModalPopup';
import Button from '../Components/Button';
import VerifyContent from '../Components/VerifyContent';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Unsuccessful from '../Components/Unsuccessful';
import { detectVariables } from '../utils/variables';



const AddFormula = () => {    
    const [equation, setEquation] = useState("") ;
    const [variables, setVariable] = useState([]);    
    const [title, setTitle] = useState("")
    const context = useContext(UserContext);
    const windowHeight = useWindowDimensions().height;
    const [verify, setVerify] = useState(false);
    const [unsuccessful, setUnsuccessful] = useState(false);
    const [imageData, setImageData] = useState(null);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    const processEquation = () => {
        setIsLoading(true);
        if (equation.length) {            
            const foundVariables = detectVariables(equation);
            setVariable(foundVariables);

            axios({
                method: 'post',
                url: `${config.solver_url}/render`,
                responseType: 'arraybuffer', // Receive binary response
                headers: {
                  'Content-Type': 'application/json',              
                },
                data: {
                  data: equation
                },
              })
                .then(response => {                    
                  // Convert the binary data to a base64-encoded string
                  const base64Image = `data:image/png;base64,${response.request._response.toString('base64')}`;                                    
                  setImageData(base64Image);              
                  setVerify(true);
                  setIsLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setUnsuccessful(true);
                });
            }
            else {
                setUnsuccessful(true);
        }
    }

    const handleSend = () => {

        axios.post(`${config.user_url}/formula/add`, {
            id: context.userObj.id,
            equation: equation,
            variables: variables,
            title: title
        }).then((response) => {            
            
            const newFormula = {
                equation: equation,
                variables: variables,
                title: title,
                createdAt: new Date().toISOString()
            }            
            const newFormulas = [...context.formulas];
            newFormulas.unshift(newFormula);            

            context.setFormulas(newFormulas);
            Toast.show({                
                text1: 'Formula successfully added!'
              });
            navigation.navigate('Menu');

        }).catch((error) => {
            console.log(error)
        })
    }

  return (
      <View style={ {backgroundColor: "#ffffff", minHeight: Math.round(windowHeight), flex: 1}}>            
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
            <ModalPopup visible={verify}>          
                <VerifyContent setVerify={setVerify} imageData={imageData} variables={variables} handleSend={handleSend}/>
            </ModalPopup>
            <ModalPopup visible={unsuccessful}>          
                <Unsuccessful title="Parsing Unsuccessful" message="Looks like FormuLister could not parse
your equation. Check again and
make sure it was inputted correctly." emoji="😞" setUnsuccessful={setUnsuccessful}/>
            </ModalPopup>
            <Text style={styles.title}>Add a Formula</Text>
            <View style={styles.contentContainer}>
                <View style={styles.imageContainer}> 
                    <Image source={require('../assets/images/Add.jpg')} style={styles.image}/>
                </View>        
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>Write you equation below</Text>
                    <Text style={styles.description}>and FormuLister will attempt to parse it</Text>
                </View>
                {isLoading ? <View style={styles.overlay}><ActivityIndicator size="large"/></View> : null}
                <TextInput style={styles.titleBox} onChangeText={setTitle} placeholder='Add a title!'/>
                <TextInput value={equation} onChangeText={setEquation} multiline={true} numberOfLines={5} style={styles.equationBox}></TextInput>
            </View>
        </View>
      </KeyboardAvoidingView>
        <View style={styles.bottom}>
            <TouchableOpacity style={styles.solveButtonContainer} onPress={processEquation}>
                <View style={styles.solveButton}>
                    <Text style={styles.addText}>Add</Text>
                </View>
            </TouchableOpacity>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    imageContainer: {                
        borderRadius: 20,
        overflow: "hidden",
        width: "100%",
        alignItems: "center",
        backgroundColor: "#ffffff"
    },
    keyboardAvoidingView: {
        backgroundColor: "#ffffff",
        flex: 1,    
        width: "100%",
            
    },
    image: {
        margin: 10,
        width: 175,
        height: 175
    },
    bottom: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row"
    },
    overlay: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",      
        opacity: 0.9,
        zIndex: 1
    },
    titleBox: {        
        fontFamily: "Poppins-Regular",
        color: "#5A5A5A",     
        width: "80%"   ,
        borderBottomWidth: 2,
        borderColor: "#767676",
        width: "80%",
        padding: 10,
        marginTop: 10
    },
    title: {
        fontSize: 43,
        fontFamily: "Poppins-SemiBold",
        color: "#2F4464",
        marginTop: StatusBar.currentHeight,
        alignSelf: "center"
    },
    descriptionContainer: {
        marginTop: 10,
    },
    description: {        
        textAlign: "center",
        fontFamily: "Poppins-Regular",
        color: "#5A5A5A"
    },
    equation: {
        fontSize: 30
    },
    solveButtonContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20, 
                 
    },
    addText: {
        color: "#ffffff",
        fontFamily: "Poppins-Medium",        
    },
    equationBox: {
        elevation: 5,
        backgroundColor: "#ffffff",
        borderRadius: 9,
        width: "80%",
        padding: 10,
        marginTop: 10
    },
    solveButton: {
        width: "80%",
        alignItems: "center",
        paddingVertical: 30,
        backgroundColor: "#1C5BFF",
        borderRadius: 20
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
        marginBottom: 200,
        marginTop: StatusBar.currentHeight,
        alignItems: "center",          
      },
})
export default AddFormula