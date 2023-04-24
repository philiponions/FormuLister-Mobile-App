import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
 
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

const OptionsButton = (props) => {
    const [toggleMenu, setToggleMenu] = useState(false)

    // Temporary interface for logging out.
    // Ideally it should be a top down menu.
    // but since logout is the only option, use this for now.
    return (
      <View style={styles.container}>      
          {toggleMenu ? <TouchableOpacity onPress={props.logOut} style={styles.logoutButton}><Text>Logout</Text></TouchableOpacity> : null}        
        <TouchableOpacity onPress={() => setToggleMenu(!toggleMenu)}>
          <SimpleLineIcons name="options-vertical" size={15} color="#6E7279" />
        </TouchableOpacity>                  
      </View>
    );
  };
   
const styles = StyleSheet.create({
  container: {    
    flexDirection: "row",
    alignItems: "center",    
  },
  logoutButton: {
    marginRight: 15
  }
})

export default OptionsButton