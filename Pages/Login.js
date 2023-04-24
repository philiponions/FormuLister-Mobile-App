import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, useWindowDimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react'
import {  useFonts } from 'expo-font'
import { StackActions, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import uuid from 'react-native-uuid';
import { UserContext } from '../Context/UserContext';
import { AntDesign } from '@expo/vector-icons';
import Field from '../Components/Field';
import Button from '../Components/Button';
import config from '../utils/config';
import { Toast } from 'react-native-toast-message/lib/src/Toast';


const Login = (props) => {  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const context = useContext(UserContext);
  const windowHeight = useWindowDimensions().height;

  // Store the generated token in local storage
  const createSession = async (token) => {
      await AsyncStorage.setItem('token', token);
    }
    
    const handleLogin = () => {
    const token = uuid.v4();

    if (username.length && password.length) {
        axios.post(`${config.user_url}/user/login`, {
            username: username,
            password: password,
            token: token
        }).then((response) => {
            createSession(token);                    
            goToLogin();        
            context.setUserObj(response.data);   
            context.setToken(token);                     
        }).catch((err) => {
            console.log(err);
        })
    } else {
        Toast.show({    
            type: 'error',            
            text1: 'Please fill out all fields.'
          });
    }

  }

  const navigation = useNavigation();
  
  const goToSignup = () => {
     navigation.navigate('Signup');
     }
  const goToLogin = () => {
     navigation.navigate('Menu');

     // Replace the current navigation state with a new one
     // index value will be current active route
     navigation.reset({
        index: 0,
        routes: [{name: "Menu"}]
     })
    }
   

  return (  
    <View style={{flex: 1, backgroundColor: "#ffffff", minHeight: Math.round(windowHeight)}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>
        <View style={styles.content}>
            <View style={styles.header}></View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>FormuLister</Text>
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/images/Login.jpg')} style={styles.loginImage}/>
                </View>
            </View>
            <View style={styles.fieldContainer}>            
                <Text style={styles.loginHeader}>Login</Text>
                <Field setField={setUsername} placeholder="Username" iconComponent={<AntDesign name="user" size={24} color="#a1a1a1" />}/>         
                <Field setField={setPassword} secureTextEntry={true} placeholder="Password" iconComponent={<AntDesign name="lock" size={24} color="#a1a1a1" />}/>                                 
            </View>
            <Button action={handleLogin} text="Login"/>        
        </View>
        <View style={styles.registerContainer}>
            <Text style={styles.registerPrompt}>New to FormuLister? </Text>
            <TouchableOpacity onPress={goToSignup}>
                <Text style={styles.signUpText}>Register</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        <Toast
        position='top'
        bottomOffset={20}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    loginHeader: {
        marginTop: 20,
        fontSize: 30,        
        color: "#001768",
        fontFamily: "Poppins-SemiBold"
    },
    loginImage: {
        width: 300,
        height: 200
    },
    textHeader: {
        backgroundColor: "#00ff00",
            
    },
    header: {
        // marginTop: 100
    },
    registerPrompt: {
        fontFamily: 'Poppins-Medium', 
        fontSize: 15,
        color: "#666666"
    },    
    fieldText: {
        marginTop: 5,
        color: "#6b6b6b",
        marginBottom: 20        
    },
    signUpText: {
        color: "#0027B1",
        fontFamily: 'Poppins-Medium', 
        fontSize: 15
    },
    fieldType: {
        alignItems: "center",        
    },
    registerContainer: {
        position: "absolute",
        bottom: 0,
        marginBottom: 20,
        flexDirection: "row",
        width: "100%",
        justifyContent: "center"
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    titleContainer: {                        
        alignItems: "center",        
    },
    title: {
        fontSize: 40,
        color: "#001768",
        fontFamily: "Poppins-SemiBold"
    },
    input: {        
        margiHorizontal: 12,                
        padding: 10,
        width: "85%",
        fontFamily: 'Raleway-Medium', 
        fontSize: 18
      },
})

export default Login