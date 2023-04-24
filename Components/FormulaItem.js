import { View, Text, StyleSheet, Touchable, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'
import { FontAwesome } from '@expo/vector-icons';
import config from '../utils/config'

const FormulaItem = (props) => {
    const navigation = useNavigation();
    const context = useContext(UserContext);   

    const deleteFormula = () => {
        const newList = props.formulas.filter((f) => f._id !== props.id);
        props.setFormulas(newList);

        // Delete the formula in the database.
        axios.put(`http://${config.url}:8000/formula/users/${context.userObj.id}/formulas/${props.id}`).catch((response) => {
            console.log(response.message);
        })
    }

    const createConfirmationAlert = () =>
    Alert.alert('Warning:', "Are you sure you wanna delete this formula?", [
    {
        text: 'No',
        onPress: () => {},
        style: 'cancel',
    },
    {text: 'Yes', onPress: () => deleteFormula()},
    ]);


    const goToUseFormula = () => {
        navigation.navigate('UseFormula')
        props.setSelectedFormula({
            equation: props.equation,
            variables: props.variables,
            id: props.id
        })
    }    

  return (
    <TouchableOpacity onPress={goToUseFormula} onLongPress={createConfirmationAlert} style={styles.container}>        
        <View style={styles.infoContainer}>            
            <Text style={styles.titleText} numberOfLines={1} ellipsizeMode='tail'>{props.title ? props.title : "Formula"}</Text>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>Date added:</Text>                        
                <Text style={styles.dateText}>{props.createdAt ? props.createdAt.split("T")[0] : ""}</Text>                        
            </View>
        </View>  
        <View style={styles.viewFormulaContainer}>            
                <Text style={styles.viewFormula}>View Formula</Text>
                <FontAwesome name="angle-right" size={27} color="white" />            
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1C5BFF",
        marginTop: 10,
        width: "98%",
        height: 155,
        borderRadius: 17,
        elevation: 5,                    
    },
    dateText: {
        fontFamily: "Poppins-Regular",
        fontSize: 15,
        color: "#6E7279"
    },
    titleText: {
        fontSize: 24,
        color: "#404C5C",
        margin: 15,
        fontFamily: "Poppins-SemiBold"
    },
    viewFormulaContainer: {        
        marginHorizontal: 20,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end"        
    },
    viewFormula: {        
        fontFamily: "Poppins-Medium",
        marginLeft: 40,        
        fontSize: 17,
        marginTop: 5,
        color: "#ffffff",
        marginRight: 10,
    },  
    infoContainer: {              
        flex: 1,     
        borderTopEndRadius: 17,
        borderTopStartRadius: 17,
        borderBottomEndRadius: 17,   
        borderBottomStartRadius: 17,   
        backgroundColor: "#ffffff",
        justifyContent: "space-between",
        maxHeight: 120,  
        wordWrap: "break-word"      
        // alignSelf: "baseline"          
    },
    dateContainer: {
        marginLeft: 15,        
    }
})

export default FormulaItem