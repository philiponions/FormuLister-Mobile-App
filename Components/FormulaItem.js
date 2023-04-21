import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const FormulaItem = () => {
    const navigation = useNavigation()

    const goToUseFormula = () => {
        navigation.navigate('UseFormula')
    }
    

  return (
    <TouchableOpacity onPress={goToUseFormula} style={styles.container}>
        <View style={styles.infoContainer}>            
            <Text>Title</Text>
            <Text>Date added: </Text>
            <Text>4/20/23</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#00bd2c",
        paddingVertical: 100,
        marginVertical: 10,
        alignItems: "center",        
    },
    infoContainer: {
        alignItems: "center"
    }
})

export default FormulaItem