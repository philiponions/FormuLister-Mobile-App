import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
 
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

const OptionsButton = (props) => {
    const [toggleMenu, setToggleMenu] = useState(false)

    return (
      <View style={props.menustyle}>
        <TouchableOpacity onPress={() => setToggleMenu(!toggleMenu)}>
                <SimpleLineIcons name="options-vertical" size={15} color="#6E7279" />
              </TouchableOpacity>
          
        { toggleMenu ? <MenuItem onPress={props.action}>Logout</MenuItem> : null }          
      </View>
    );
  };
   
export default OptionsButton