import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import GoBackButton from '../../components/GoBackButton'

const editInvoice = () => {
  const params = useLocalSearchParams()
  const router = useRouter()
  const { id } = params // id of this specific Invoice
  
  return (
    <View style={styles.container}>
      <GoBackButton />
      <Text>editInvoice with the id of {id} - WIP</Text>
    </View>
  )
}

export default editInvoice

const styles = StyleSheet.create({
  container: {
    flex: 1, paddingTop: 32, paddingHorizontal: 24
  },
})