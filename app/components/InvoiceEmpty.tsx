import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'

const InvoiceEmpty = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../images/illustration-empty.svg')} contentFit='contain' />
      <Text style={styles.mainText}>There is nothing here</Text>
      <Text style={styles.subText }>Create an invoice by clicking the <Text style={{fontWeight: '700'}}>New</Text> button and get started</Text>
    </View>
  )
}

export default InvoiceEmpty

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
  },
  image: {
    width: 193,
    height: 160
  },
  mainText: {
    color: '#0C0E16',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 42,
  },
  subText: {
    color: '#888EB0',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 23,
    width: 206,
    textAlign: 'center'
  }
})