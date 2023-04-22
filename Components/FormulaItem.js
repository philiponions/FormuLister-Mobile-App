import { View, Text, StyleSheet, Touchable, TouchableOpacity, Alert } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'

const FormulaItem = (props) => {
    const navigation = useNavigation();
    const context = useContext(UserContext);   

    const deleteFormula = () => {
        console.log(props.id);
        const newList = props.formulas.filter((f) => f._id !== props.id);
        props.setFormulas(newList);

        // Delete the formula in the database.
        axios.put(`http://10.0.2.2:8000/formula/users/${context.userObj.id}/formulas/${props.id}`).then((response) => {
            console.log(response.message);
        }).catch((response) => {
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

  return (
    <TouchableOpacity onPress={goToUseFormula} onLongPress={createConfirmationAlert} style={styles.container}>
        <View style={styles.infoContainer}>            
            <Text style={styles.equationText}>{props.equation}</Text>            
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
    equationText: {
        fontSize: 24
    },
    infoContainer: {
        alignItems: "center"
    }
})

export default FormulaItem