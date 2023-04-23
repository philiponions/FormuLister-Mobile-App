import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Unsuccessful = (props) => {         
    return (
    <View style={styles.verifyContainer}>                
                <View style={styles.unsuccessfulContent}>
                    <Text style={styles.unsuccessfulText}>Parsing Unsuccessful</Text>                    
                </View>
                <View style={styles.emojiContainer}>
                    <Text style={styles.emoji}>
                        😞
                    </Text>
                </View>
                <View style={styles.variablesText}>
                    <Text style={styles.unsuccessfulDescription}>Looks like FormuLister could not parse
                    your equation. Check again and
                    make sure it was inputted correctly. </Text>                                    
                </View>
                <TouchableOpacity onPress={() => props.setUnsuccessful(false)} style={styles.modalButton}>
                    <Text style={styles.modalText}>Dismiss</Text>
                </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    unsuccessfulContent: {
        alignItems: "center"
    },
    emojiContainer: {
        alignItems: "center"
    },
    emoji: {
        fontSize: 50
    },
    variablesText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    closeContainer: {        
        alignItems: "flex-end"
    },
    unsuccessfulText: {
        fontSize: 28,        
        fontFamily: "Poppins-SemiBold",        
    },
    unsuccessfulDescription: {
        fontFamily: "Poppins-Regular",
        fontSize: 15,
        textAlign: "center",
        marginVertical: 15,
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

export default Unsuccessful