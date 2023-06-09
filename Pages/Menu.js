import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import FormulaItem from '../Components/FormulaItem'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'
import { SimpleLineIcons } from '@expo/vector-icons';
import OptionsButton from '../Components/OptionsButton'
import config from '../utils/config'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import ModalPopup from '../Components/ModalPopup'
import DeleteAlert from '../Components/DeleteAlert'

const Menu = (props) => {
    const context = useContext(UserContext);  

    useEffect(() => {                 
        if (!Object.keys(context.userObj).length == 0) {            
            axios.get(`${config.user_url}/formula/get/${context.userObj.id}`).then((response) => {            
                context.setFormulas(response.data);        
            }).catch((error) => {console.log(error)})
        }     
      }, [context.userObj])

    const navigation = useNavigation()

    const goToAddFormula = () => {
        navigation.navigate('AddFormula');
    }

    const deleteFormula = (id) => {
        const newList = context.formulas.filter((f) => f._id !== id);
        context.setFormulas(newList);
        console.log("deleting")
        // Delete the formula in the database.
        axios.put(`${config.user_url}/formula/users/${context.userObj.id}/formulas/${id}`).catch((response) => {
            console.log(response.message);
        })
    }

    const logOut = async () => {
        navigation.navigate('Menu');                
        axios.put(`${config.user_url}/user/logout`, {
            token: context.token
        }, async (response) => {
            context.setToken("")            
            await AsyncStorage.setItem('token', null)                        
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

    const renderFormulas = () => {
        if (context.formulas.length) {            
            return context.formulas.map((item) => {
                return <View style={styles.formuaList}>
                    <FormulaItem                                     
                                        selectedFormula={props.selectedFormula} 
                                        setSelectedFormula={props.setSelectedFormula}
                                        equation={item.equation} 
                                        variables={item.variables}
                                        formulas={context.formulas}
                                        id={item._id}
                                        createdAt={item.createdAt}
                                        title={item.title}
                                        setFormulas={context.setFormulas}/>
                </View>
                
            })
        } else {
            return <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Your list is currently empty. Start adding formulas with the button below!</Text>
            </View>
        }
    }

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.userHeader}>
            <View style={styles.profileContainer}>
                <View style={styles.circle}/>
                <View style={styles.textHeader}>
                    <Text style={styles.welcomeText}>Welcome!</Text>
                    <Text style={styles.userText}>{context.userObj.username}</Text>
                </View>            
            </View>
            <OptionsButton logOut={logOut}/>
        </View>
        <View style={styles.formulaHeader}>
            <View>
                <Text style={styles.formulasText}>Your</Text>
                <Text style={styles.formulasText}>Formulas 🚀 </Text>
            </View>
        </View>
        <TouchableOpacity style={styles.addButtonContainer} onPress={goToAddFormula}>
            <View style={styles.addButton}>
                <Text style={styles.plus}>+</Text>
            </View>
        </TouchableOpacity>
        <ScrollView style={styles.scrollView}>            
            {renderFormulas()}
        </ScrollView>
        <Toast
        position='top'
        bottomOffset={20}
      />
    </SafeAreaView>
  )
}

export default Menu

const styles = StyleSheet.create({
    userHeader: {
        marginTop: 30,
        marginHorizontal: 30,
        marginBottom: 10,
        padding: 15,
        borderRadius: 15,                
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        elevation: 5,     
        backgroundColor: 'white',
        flexDirection: "row",
        justifyContent: "space-between"
    },    
    emptyContainer: {        
        marginTop: 50,
    },
    emptyText: {
        fontFamily: "Poppins-Regular",
        color: "#767676",
        textAlign: "center"
    },
    profileContainer: {
        flexDirection: "row"
    },  
    textHeader: {
        marginLeft: 10
    },
    formulaHeader: {
        alignItems: "center"
    },
    formulasText: {
        fontSize: 50,
        fontFamily: "Raleway-Bold",
        color: "#181E55",        
    },
    circle: {
        backgroundColor: "#27C100",
        padding: 25,
        borderRadius: 100
    },
    welcomeText: {
        fontFamily: "Raleway-Medium",
        color: "#585858"
    },
    userText: {
        fontFamily: "Raleway-SemiBold",   
        color: "#000742"    
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    formuaList: {
        alignItems: "center",
        marginBottom: 12,
    },
    scrollView: {
        marginHorizontal: 20,
        height: "80%"
    },
    addButtonContainer: {
        position: "absolute",
        bottom: 0,
        left: "75%",
        marginBottom: 20, 
        zIndex: 1,                            
        flex: 1,
    },
    plus: {
        color: "#ffffff", 
        fontSize: 50
    },
    addButton: {
        elevation: 5,        
        width: 75,
        height: 75,
        borderRadius: 100,
        backgroundColor: "#1954ED",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },    
    logoutButtonContainer: {             
        flexDirection: "row",        
        justifyContent: "flex-end"
    }
});
