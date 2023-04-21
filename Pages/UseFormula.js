import { View, Text, StyleSheet, StatusBar, Touchable, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import VariableInput from '../Components/VariableInput'

const UseFormula = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Use Formula</Text>
      <View style={styles.contentContainer}>
        <View style={styles.equationContainer}>
            <Text style={styles.equation}>K = (1/2)m*v^2</Text>
        </View>
            <ScrollView style={styles.variableBox}>
                <VariableInput variable={"K"}/>
                <VariableInput variable={"M"}/>
                <VariableInput variable={"v"}/>
                <VariableInput variable={"K"}/>
                <VariableInput variable={"M"}/>
                <VariableInput variable={"v"}/>
                <VariableInput variable={"K"}/>
                <VariableInput variable={"M"}/>
                <VariableInput variable={"v"}/>
                <VariableInput variable={"K"}/>
                <VariableInput variable={"M"}/>
                <VariableInput variable={"v"}/>
            </ScrollView>
      </View>
      <TouchableOpacity style={styles.solveButtonContainer}>
        <View style={styles.solveButton}>
            <Text>Solve</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 50,
    },
    equation: {
        fontSize: 30
    },
    solveButtonContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
        
    },
    solveButton: {
        width: "80%",
        alignItems: "center",
        paddingVertical: 30,
        backgroundColor: "#00ff00"
    },  
    contentContainer: {
        width: "100%",
        justifyContent: "center",
        flex: 1,
        alignItems: "center"
    },
    variableBox: {
        borderWidth: 2,
        height: 50,
        width: "80%"        
    },
    equationContainer: {
        padding: 20,
        borderWidth: 2,
        marginBottom: 100
    },
    container: {
          flex: 1,
          marginTop: StatusBar.currentHeight,
          alignItems: "center"
      },
})
export default UseFormula