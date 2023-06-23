import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';

type Props = {}

const index = (props: Props) => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id, other } = params
  
  return (
    <View>
      <Text>ABOUT PAGE</Text>
      <Text>{other}</Text>
      <Text onPress={() => router.push('/')}>GO BACK</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})