import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Menu from './Pages/Menu';
import UseFormula from './Pages/UseFormula';
import AddFormula from './Pages/AddFormula';
import { useEffect, useState } from 'react';


export default function App() {
  const [selectedFormula, setSelectedFormula] = useState({})

  useEffect(() => {
    console.log("change")
  },[selectedFormula])

  return (
    <NavigationContainer>
      <Stack.Navigator>
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

});
