import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DeleteAlert = (props) => {    
    const handleYes = () => {
        props.deleteFormula();
        props.setDeleteConfirm(false);
    }
    return (
    <View style={styles.verifyContainer}>                
                <View style={styles.verifyContent}>
                    <Text style={styles.verifyText}>Warning</Text>
                    <Text style={styles.verifyDescription}>Are you sure you want to delete this formula?</Text>                                        
                </View>                
                <TouchableOpacity onPress={handleYes} style={[styles.modalButton, {backgroundColor: "#1C5BFF"}]}>
                    <Text style={[styles.modalText, {color: "white"}]}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.setDeleteConfirm(false)} style={[styles.modalButton, {backgroundColor: "#EEEEEE", marginTop: 10}]}>
                    <Text style={styles.modalText}>No</Text>
                </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    imageContainer: {        
        width: 250,
        height: 90
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
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
        padding: 20,
        alignItems: "center",
        borderRadius: 20
    },
    modalText: {        
        fontFamily: "Poppins-Medium"
    },

})

export default DeleteAlert