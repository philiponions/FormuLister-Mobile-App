import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {  useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import Field from '../Components/Field'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Button from '../Components/Button'
import config from '../Utils.js/config'


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
            axios.post(`http://${config.url}:8000/user/register`, {
                username: username,
                email: email,
                password: password,        
            }).then(() => {
                console.log("Signup successful");
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
    <View style={{flex: 1, backgroundColor: "#ffffff"}}>
      <View style={styles.content}>
        <Text style={styles.title}>FormuLister</Text>
        <View>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/images/Signup.jpg')} style={styles.image}/>
            </View>
        </View>
        <View>
            <Text style={styles.signUpHeader}>Sign Up</Text>                    
            <Field setField={setEmail} placeholder="Email" iconComponent={<MaterialIcons name="email" size={24} color="#a1a1a1" />}/>                                 
            <Field setField={setUsername} placeholder="Username" iconComponent={<AntDesign name="user" size={24} color="#a1a1a1" />}/>                                 
            <Field setField={setPassword} secureTextEntry={true} placeholder="Password" iconComponent={<AntDesign name="lock" size={24} color="#a1a1a1" />}/>        
            <Field setField={setConfirmPassword} secureTextEntry={true} placeholder="Confirm Password" iconComponent={<AntDesign name="lock" size={24} color="#a1a1a1" />}/>        
            
        </View>
            <Button action={handleSignup} text="Sign up!"/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    signUpHeader: {
        marginTop: 20,
        fontSize: 30,        
        color: "#001768",
        fontFamily: "Poppins-SemiBold"
    },
    image: {
        width: 300,
        height: 200,
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
        borderWidth: 1,
        padding: 10,
      },
})

export default Signup