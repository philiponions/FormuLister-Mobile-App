import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const VerifyContent = (props) => {    

    return (
    <View style={styles.verifyContainer}>
                <View style={styles.closeContainer}>
                    <TouchableOpacity onPress={() => props.setVerify(false)}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.verifyContent}>
                    <Text style={styles.verifyText}>Is this correct?</Text>
                    <Text style={styles.verifyDescription}>FormuLister found the following formula: </Text>                
                        <Image source={{uri: props.imageData}} style={{width: 100,height:100}}/>                
                </View>
                <View style={styles.variablesText}>
                    <Text style={styles.verifyDescription}>with variables </Text>                                    
                    {props.variables.map((item) => {
                        return <Text style={styles.verifyDescription}>{item},</Text>
                    })} 
                </View>
                <TouchableOpacity onPress={props.handleSend} style={styles.modalButton}>
                    <Text style={styles.modalText}>Yes this is correct.</Text>
                </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    verifyContent: {
        alignItems: "center"
    },
    variablesText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    closeContainer: {        
        alignItems: "flex-end"
    },
    verifyText: {
        fontSize: 28,
        fontFamily: "Poppins-SemiBold",        
    },
    verifyDescription: {
        fontFamily: "Poppins-Regular",
        fontSize: 15,
        textAlign: "center"
    },
    modalButton: {
        backgroundColor: "#1C5BFF",
        padding: 20,
        alignItems: "center",
        borderRadius: 20
    },
    modalText: {
        color: "#ffffff",
        fontFamily: "Poppins-Medium"
    },

})

export default VerifyContent