import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import {  useFonts } from 'expo-font'
import { StackActions, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import uuid from 'react-native-uuid';


const Login = (props) => {  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Store the generated token in local storage
  const createSession = async (token) => {
      await AsyncStorage.setItem('token', token);
    }
    
    const handleLogin = () => {
    const token = uuid.v4();

    axios.post("http://10.0.2.2:8000/user/login", {
        username: username,
        password: password,
        token: token
    }).then((response) => {
        createSession(token)                        
        goToLogin();
        console.log(response.data)
    }).catch((err) => {
        console.log(err);
    })

  }

  const navigation = useNavigation()
  
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
    <View style={{flex: 1}}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>FormuLister</Text>
        </View>
        
        <View style={styles.field}>
            <TextInput style={styles.input} onChangeText={setUsername}/>
            <View style={styles.fieldType}>
                <Text style={styles.fieldText}>Username</Text>
            </View>
        </View>
        
        <View style={styles.field}>
            <TextInput style={styles.input} onChangeText={setPassword} secureTextEntry={true}/>
            <View style={styles.fieldType}>
                <Text style={styles.fieldText}>Password</Text>
            </View>
        </View>
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        
        <View style={styles.registerContainer}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={goToSignup}>
                <Text style={styles.signUpText}>Sign up</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    loginButton: {
        alignItems: "center",
        backgroundColor: "#4287f5",
        width: "80%",
        paddingVertical: 20,
        marginTop: 20
    },
    fieldText: {
        marginTop: 5,
        color: "#6b6b6b",
        marginBottom: 20        
    },
    loginText: {
        color: "white"
    },
    signUpText: {
        color: "#4287f5"
    },
    fieldType: {
        alignItems: "center",        
    },
    registerContainer: {
        position: "absolute",
        bottom: 0,
        marginBottom: 20,
        flexDirection: "row"
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    field: {        
        width: "80%",
        
    },
    titleContainer: {                        
        alignItems: "center",
        marginBottom: 100
    },
    input: {        
        margiHorizontal: 12,        
        borderWidth: 1,
        padding: 10,
      },
})

export default Login