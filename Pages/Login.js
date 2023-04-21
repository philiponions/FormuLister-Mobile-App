import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import {  useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'


const Login = (props) => {  
  const navigation = useNavigation()
  
  const goToSignup = () => {
     navigation.navigate('Signup')
     }
  const goToLogin = () => {
     navigation.navigate('Menu')
    }
   

  return (
    <View style={{flex: 1}}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>FormuLister</Text>
        </View>
        
        <View style={styles.field}>
            <TextInput style={styles.input} />
            <View style={styles.fieldType}>
                <Text style={styles.fieldText}>Username</Text>
            </View>
        </View>
        
        <View style={styles.field}>
            <TextInput style={styles.input} secureTextEntry={true}/>
            <View style={styles.fieldType}>
                <Text style={styles.fieldText}>Password</Text>
            </View>
        </View>
        
        <TouchableOpacity style={styles.loginButton} onPress={goToLogin}>
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