import { StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'
import React from 'react'
import { useRouter } from 'expo-router'

const GoBackButton = () => {
  const router = useRouter()
  
  return (
    <View style={styles.goBackContainer}>
      <Image style={styles.arrowLeftIcon} source={require('../assets/images/icon-arrow-left.svg')} />
      <Text onPress={() => router.back()} style={styles.blackText}>Go Back</Text>
    </View>
  )
}

export default GoBackButton

const styles = StyleSheet.create({
  goBackContainer: {
    flexDirection: 'row', alignItems: 'center', gap: 24
  },
  blackText: {
    color: '#0C0E16',
    fontWeight: '700',
    fontSize: 15,
  },
  arrowLeftIcon: {
    width: 8, height: 8
  },
})