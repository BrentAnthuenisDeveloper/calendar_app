import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyText from '../Components/MyText'
import { TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'

const SettingsScreen = () => {
  const dispatch=useDispatch()
  return (
    <View>
      <TextInput
        style={{ margin: 10 }}
        label="current Date"
        mode="outlined"
        placeholder="dd/mm/yyyy"
        autoCapitalize="none"
        onChangeText={()=>{dispatch}}>
        
        </TextInput>
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({})