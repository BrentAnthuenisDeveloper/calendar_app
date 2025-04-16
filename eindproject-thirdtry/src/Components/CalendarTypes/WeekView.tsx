import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CalendarEvent } from '../../Navigation/types';

interface WeekViewProps{
    calendar: CalendarEvent[];
}
const WeekView = ({calendar}:WeekViewProps) => {
  return (
    <View>
      <Text>WeekView</Text>
    </View>
  )
}

export default WeekView

const styles = StyleSheet.create({})