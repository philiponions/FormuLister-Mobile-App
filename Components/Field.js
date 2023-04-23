import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

const Field = (props) => {
  const IconComponent = props.iconComponent;
  return (
    <View style={styles.field}>            
                {IconComponent}                
                <TextInput style={styles.input} secureTextEntry={props.secureTextEntry} onChangeText={props.setField} placeholder={props.placeholder}/>         
    </View>
  )
}

const styles = StyleSheet.create({
    field: {        
        flexDirection: "row",
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 2,
        marginTop: 20,
        borderBottomColor: "#a1a1a1"   
    },
    input: {        
        margiHorizontal: 12,                
        padding: 10,
        width: "85%",
        fontFamily: 'Raleway-Medium', 
        fontSize: 18
    },
})

export default Field