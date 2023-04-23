import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {  useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'


const Signup = (props) => {  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  
  const handleSignup = () => {
      
    if (password === confirmPassword) {
        if (password.length >= 6) {
            // Api call good to go
            axios.post("http://10.0.2.2:8000/user/register", {
                username: username,
                email: email,
                password: password,        
            }).then((response) => {
                console.log("Login successful");
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                // Go back to login regardless
                navigation.navigate("Login");
            })
        } else {
            // TODO: toast warnings
            console.log("We recommend a password with 6 characters or more.")
        }
    } else {
        // TODO: toast warnings
        console.log("passwords must be the same");
    }
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Signup</Text>
        </View>
        
        <View style={styles.field}>
            <TextInput style={styles.input} onChangeText={setEmail}/>
            <View style={styles.fieldType}>
                <Text style={styles.fieldText}>Email</Text>
            </View>
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

        <View style={styles.field}>
            <TextInput style={styles.input} onChangeText={setConfirmPassword} secureTextEntry={true}/>
            <View style={styles.fieldType}>
                <Text style={styles.fieldText}>Confirm Password</Text>
            </View>
        </View>
        
        <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
            <Text style={styles.loginText}>Sign up</Text>
        </TouchableOpacity>
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

export default Signup