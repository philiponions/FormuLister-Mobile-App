import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function Button(props) {
  return (
    <TouchableOpacity style={styles.loginButton} onPress={props.action}>
            <Text style={styles.loginText}>{props.text}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    loginText: {
        color: "white",
        fontFamily: 'Poppins-Medium', 
        fontSize: 18
    },
    loginButton: {
        alignItems: "center",
        backgroundColor: "#0072F8",
        width: "80%",
        paddingVertical: 20,
        borderRadius: 10,
        marginTop: 20
    },
})