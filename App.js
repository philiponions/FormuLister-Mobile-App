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
import { UserContext } from './Context/UserContext';
import { useFonts } from 'expo-font';
import config from './utils/config';


export default function App() {
  const [initialised, setInitialised] = useState(false);  
  const [initialRoute, setInitialRoute] = useState("");
  const [token, setToken] = useState("");
  const [userObj, setUserObj] = useState({});
  const [formulas, setFormulas] = useState([]);
  
  // Loads all the fonts. 
  // This is asynchronous so make sure to have a boolean to check if its finished loading all fonts.
  let [fontsLoaded] = useFonts({
    'Poppins-Medium': require("./assets/fonts/Poppins-Medium.ttf"),
    'Poppins-Regular': require("./assets/fonts/Poppins-Regular.ttf"),
    'Poppins-SemiBold': require("./assets/fonts/Poppins-SemiBold.ttf"),
    'Raleway-Medium': require("./assets/fonts/Raleway-Medium.ttf"),
    'Raleway-SemiBold': require("./assets/fonts/Raleway-SemiBold.ttf"),
    'Raleway-Bold': require("./assets/fonts/Raleway-Bold.ttf"),
    'Poppins-Italic': require("./assets/fonts/Poppins-Italic.ttf"),
  })


  getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      axios.post(`${config.user_url}/user/authenticate`, {
        token: token
      }).then((response) => {                  
        setUserObj({ username: response.data.username, id: response.data.id })        
        setToken(token)
        setInitialRoute("Menu")
        
      }).catch((err) => {        
        setInitialRoute("Login")
      })       
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUserToken();
  }, [])  

  const isMountedRef = useRef(false);
  
  useEffect(() => {
      if (isMountedRef.current) {
          setInitialised(true)          
      }
      else {
          isMountedRef.current = true
      }
  }, [initialRoute])

  return initialised && fontsLoaded ? <UserContext.Provider value={{token, setToken, userObj, setUserObj, formulas, setFormulas}}>
                          <Router initialRoute={initialRoute} 
                                /> 
                        </UserContext.Provider>
                     : <View style={styles.loadingScreen}><ActivityIndicator size="large"/></View>

}
  
  
const Router = (props) => {
  const [selectedFormula, setSelectedFormula] = useState({});  
  const [cache, setCache] = useState({}); // Cache data if api has been called. Used in images for formula.

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
            {() => <Menu selectedFormula={selectedFormula} 
                              setSelectedFormula={setSelectedFormula}/>}  
          </Stack.Screen> 
        <Stack.Screen
          name="UseFormula"          
          options={{ headerShown: false }}>
            {(props) => <UseFormula cache={cache} 
                                    setCache={setCache} 
                                    selectedFormula={selectedFormula}/>}  
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
