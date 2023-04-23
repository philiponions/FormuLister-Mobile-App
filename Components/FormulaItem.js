import { View, Text, StyleSheet, Touchable, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'

const FormulaItem = (props) => {
    const navigation = useNavigation();
    const context = useContext(UserContext);   

    const deleteFormula = () => {
        const newList = props.formulas.filter((f) => f._id !== props.id);
        props.setFormulas(newList);

        // Delete the formula in the database.
        axios.put(`http://10.0.2.2:8000/formula/users/${context.userObj.id}/formulas/${props.id}`).catch((response) => {
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
            variables: props.variables
        })
    }

    useEffect(() => {
        console.log(props.cre)
    }, [])

  return (
    <TouchableOpacity onPress={goToUseFormula} onLongPress={createConfirmationAlert} style={styles.container}>
        <View style={styles.infoContainer}>            
            <Text style={styles.titleText}>{props.title ? props.title : "Formula"}</Text>
            <Text style={styles.titleText}>{props.createdAt ? props.createdAt.split("T")[0] : ""}</Text>                        
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        paddingVertical: 80,
        marginVertical: 10,
        alignItems: "center",    
        borderRadius: 10,
        elevation: 5       
    },
    titleText: {
        fontSize: 24
    },
    infoContainer: {
        alignItems: "center"
    }
})

export default FormulaItem