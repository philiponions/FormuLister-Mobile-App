import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import {  useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import Field from '../Components/Field'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Button from '../Components/Button'
import config from '../Utils.js/config'
import { Toast } from 'react-native-toast-message/lib/src/Toast'


const Signup = (props) => {  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  
  function isValidEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function checkValidity() {
    if (!isValidEmail()) return "Please enter a valid email!"
    if (username.length < 4) return "Please enter a username 4 characters or mroe"
    if (password.length <= 6) return "We recommend a password with 6 characters or more."
    if (password !== confirmPassword) return "Passwords must match."
    else {return null}        
  }

  const handleSignup = () => {
      
    const errorMessage = checkValidity();

    // if no error message, its good
    if (!errorMessage) {
            // Api call good to go
            axios.post(`http://${config.url}:8000/user/register`, {
                username: username,
                email: email,
                password: password,        
            }).then(() => {
                navigation.navigate("Login");
                Toast.show({                
                    text1: 'Sign up successful!'
                  });                
            }).catch((err) => {
                console.log(err);
                Toast.show({    
                    type: 'error',            
                    text1: err.response.data
                  });
            })
        } else {
            Toast.show({    
                type: 'error',            
                text1: errorMessage
              });
        }
  }

  return (
    <View style={{flex: 1, backgroundColor: "#ffffff"}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>
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
      </KeyboardAvoidingView>
      <Toast
        position='top'
        bottomOffset={20}
      />
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
        width: 200,
        height: 140,
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