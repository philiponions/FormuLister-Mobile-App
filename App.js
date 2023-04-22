import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Menu from './Pages/Menu';
import UseFormula from './Pages/UseFormula';
import AddFormula from './Pages/AddFormula';
import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function App() {
  const [initialised, setInitialised] = useState(false);  
  const [initialRoute, setInitialRoute] = useState("")
  let isAuthenticated = false;

  getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token)      
      axios.post("http://10.0.2.2:8000/user/authenticate", {
        token: token
      }).then((response) => {
        console.log(response.data)                
        setInitialRoute("Menu")
        
      }).catch((err) => {
        console.log(err)
        setInitialRoute("Login")
      })       
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getUserToken();
  }, [])  

  const isMountedRef = useRef(false);
  
  useEffect(() => {
      if (isMountedRef.current) {
          setInitialised(true)
          console.log(initialRoute)
      }
      else {
          isMountedRef.current = true
      }
  }, [initialRoute])

  return initialised ? <Router initialRoute={initialRoute}/> : <View style={styles.loadingScreen}><ActivityIndicator size="large"/></View>

}
  
  
const Router = (props) => {
  const [selectedFormula, setSelectedFormula] = useState({});  
  useEffect(() => {
    console.log("received", props.initialRoute)
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={props.initialRoute}>
        <Stack.Screen
          name="Login"          
          options={{ headerShown: false }}>
            {(props) => <Login/>}  
          </Stack.Screen>        
        <Stack.Screen
          name="Signup"
          component={Signup}  
          options={{ headerShown: false }}
        />        
        <Stack.Screen
          name="Menu"          
          options={{ headerShown: false }}>
            {(props) => <Menu selectedFormula={selectedFormula} setSelectedFormula={setSelectedFormula}/>}  
          </Stack.Screen> 
        <Stack.Screen
          name="UseFormula"          
          options={{ headerShown: false }}>
            {(props) => <UseFormula selectedFormula={selectedFormula}/>}  
          </Stack.Screen>      
        <Stack.Screen
          name="AddFormula"          
          options={{ headerShown: false }}>
            {(props) => <AddFormula/>}  
        </Stack.Screen>         
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
