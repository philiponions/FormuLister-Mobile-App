import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import FormulaItem from '../Components/FormulaItem'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'

const Menu = (props) => {
    const context = useContext(UserContext);    
    
    useEffect(() => {
        console.log('formulas');
        console.log(context)
    }, [])

    useEffect(() => {
        axios.get(`http://10.0.2.2:8000/formula/get/${context.userObj.id}`).then((response) => {
            context.setFormulas(response.data);        
        }).catch((error) => {console.log(error)})
      }, [context.userObj])

    const navigation = useNavigation()

    const goToAddFormula = () => {
        navigation.navigate('AddFormula');
    }

    useEffect(() => {
        console.log("token received:", props.token);
    }, [props.token])

    const logOut = async () => {
        navigation.navigate('Menu');        
        console.log(props.token);
        axios.put("http://10.0.2.2:8000/user/logout", {
            token: props.token
        }, async (response) => {
            props.setToken("")            
            await AsyncStorage.setItem('token', null)            
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })        

        // Replace the current navigation state with a new one
        // index value will be current active route
        navigation.reset({
            index: 0,
            routes: [{name: "Login"}]
        })
    }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.userHeader}>
            <Text>Welcome!</Text>
            <Text>{context.userObj.username}</Text>
        </View>
        <View style={styles.logoutButtonContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
                    <Text>Log out</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButtonContainer} onPress={goToAddFormula}>
            <View style={styles.addButton}>
                <Text>Add button</Text>
            </View>
        </TouchableOpacity>
        <ScrollView style={styles.scrollView}>
            {
                context.formulas.map((item) => {
                    return <FormulaItem selectedFormula={props.selectedFormula} 
                                        setSelectedFormula={props.setSelectedFormula}
                                        equation={item.equation} 
                                        variables={item.variables}
                                        formulas={context.formulas}
                                        id={item._id}
                                        setFormulas={context.setFormulas}/>
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
        flexDirection: "row",
        flex: 1
    },
    addButton: {
        padding: 30,
        backgroundColor: "#4287f5",
    },
    logoutButton: {
        backgroundColor: "#787878",
        padding: 30
    },
    logoutButtonContainer: {             
        flexDirection: "row",        
        justifyContent: "flex-end"
    }
});
