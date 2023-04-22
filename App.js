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
import { useContext, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { UserContext } from './Context/UserContext';


export default function App() {
  const [initialised, setInitialised] = useState(false);  
  const [initialRoute, setInitialRoute] = useState("");
  const [token, setToken] = useState("");
  const [userObj, setUserObj] = useState({});
  const [formulas, setFormulas] = useState([])
  let isAuthenticated = false;

  useEffect(() => {
    console.log(userObj)
  }, [userObj])

  getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      axios.post("http://10.0.2.2:8000/user/authenticate", {
        token: token
      }).then((response) => {
        console.log(response.data)                
        setUserObj({ username: response.data.username, id: response.data.id })        
        setToken(token)
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

  return initialised ? <UserContext.Provider value={{userObj, setUserObj, formulas, setFormulas}}>
                          <Router initialRoute={initialRoute} 
                                token={token} 
                                setToken={setToken}/> 
                        </UserContext.Provider>
                     : <View style={styles.loadingScreen}><ActivityIndicator size="large"/></View>

}
  
  
const Router = (props) => {
  const [selectedFormula, setSelectedFormula] = useState({});  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={props.initialRoute}>
        <Stack.Screen
          name="Login"          
          options={{ headerShown: false }}>
            {(props) => <Login token={props.token} setToken={props.setToken}/>}  
          </Stack.Screen>        
        <Stack.Screen
          name="Signup"
          component={Signup}  
          options={{ headerShown: false }}
        />        
        <Stack.Screen
          name="Menu"          
          options={{ headerShown: false }}>
            {() => <Menu selectedFormula={selectedFormula} 
                              setSelectedFormula={setSelectedFormula}
                              token={props.token}
                              setToken={props.setToken}/>}  
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
