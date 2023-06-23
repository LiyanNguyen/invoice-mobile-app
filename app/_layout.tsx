import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import TopNav from './components/TopNav'

const Layout = () => {
  return (
    <View style={styles.container}>
      <TopNav/>
      <Slot/>
    </View>
  )
}

export default Layout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FB'
  },
})