import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import FormulaItem from '../Components/FormulaItem'
import { useNavigation } from '@react-navigation/native'

const Menu = () => {
    const navigation = useNavigation()

    const goToAddFormula = () => {
        navigation.navigate('AddFormula')
    }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.userHeader}>
            <Text>Welcome!</Text>
            <Text>Username</Text>
        </View>
        <TouchableOpacity style={styles.addButtonContainer}>
            <View style={styles.addButton}>
                <Text>Add button</Text>
            </View>
        </TouchableOpacity>
        <ScrollView style={styles.scrollView}>
            <FormulaItem/>
            <FormulaItem/>
            <FormulaItem/>
            <FormulaItem/>
            <FormulaItem/>
            <FormulaItem/>
            <FormulaItem/>
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
