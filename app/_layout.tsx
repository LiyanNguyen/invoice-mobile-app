import { StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Slot } from 'expo-router'
import TopNav from '../components/TopNav'
import { SafeAreaView } from 'react-native-safe-area-context'

const Layout = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar style='light' backgroundColor='black' />
    <TopNav />
    <Slot />
  </SafeAreaView>
)

export default Layout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FB'
  },
})