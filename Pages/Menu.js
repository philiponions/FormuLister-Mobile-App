import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import FormulaItem from '../Components/FormulaItem'
import { useNavigation } from '@react-navigation/native'

const Menu = (props) => {
    const navigation = useNavigation()
    const formulas = [
        {
            expression: "x^2 = y",
            variables: ["x", "y"]
        },
        {
            expression: "K = (1/2)*m*v^2",
            variables: ["K", "m", "v"]
        },
        {
            expression: "a^2 + b^2 = c^2",
            variables: ["a", "b", "c"]
        },
        {
            expression: "g = F/m",
            variables: ["g", "F", "m"]
        },
        {
            expression: "F = (G * x * y)/(r)**2",
            variables: ["F", "G", "x", "y", "r"]
        },
    ]

    const goToAddFormula = () => {
        navigation.navigate('AddFormula')
    }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.userHeader}>
            <Text>Welcome!</Text>
            <Text>Username</Text>
        </View>
        <TouchableOpacity style={styles.addButtonContainer} onPress={goToAddFormula}>
            <View style={styles.addButton}>
                <Text>Add button</Text>
            </View>
        </TouchableOpacity>
        <ScrollView style={styles.scrollView}>
            {
                formulas.map((item) => {
                    return <FormulaItem selectedFormula={props.selectedFormula} 
                                        setSelectedFormula={props.setSelectedFormula}
                                        expression={item.expression} 
                                        variables={item.variables}/>
                })
            }

        </ScrollView>
    </SafeAreaView>
  )
}

export default Menu

const styles = StyleSheet.create({
    userHeader: {
        margin: 30
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    scrollView: {
        marginHorizontal: 20,
        height: "80%"
    },
    addButtonContainer: {
        position: "absolute",
        bottom: 0,
        zIndex: 1,    
        backgroundColor: "#4287f5",
        flexDirection: "row",
        flex: 1
    },
    addButton: {
        padding: 30
    }
});
