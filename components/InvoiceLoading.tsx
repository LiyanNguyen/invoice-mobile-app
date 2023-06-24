import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const InvoiceLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color='#7E88C3' size="large" style={styles.indicator} />
    </View>
  )
}

export default InvoiceLoading

const styles = StyleSheet.create({
  container: {
    height: 240, alignItems: 'center', justifyContent: 'center'
  },
  indicator: {
    transform: [{ scale: 1.25 }]
  }
})