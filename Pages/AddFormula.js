import { View, Text } from 'react-native'
import React from 'react'

const AddFormula = () => {
  return (
    <View style={styles.container}>
      <Text>AddFormula</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
          flex: 1,
          marginTop: StatusBar.currentHeight
      },
})
export default AddFormula