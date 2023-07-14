import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Input from '../../components/Input'
import GoBackButton from '../../components/GoBackButton'
import { userData } from '../../data'

const settings = () => {
  return (
    <>
      <View style={styles.container}>
        <GoBackButton />
        <Text style={styles.headerText}>Settings - WIP</Text>
        <ScrollView style={{ marginVertical: 24 }} contentContainerStyle={{ gap: 24 }}>
          <Input title='Name' value={userData.name} />
          <Input title='Email' type='email' value={userData.email} />
          <Input title='Password' value={'asdasd'} isPassword />
          <Input title='Street Address' value={userData.street} />
          <View style={styles.doubleInputContainer}>
            <Input title='City' value={userData.city} />
            <Input title='Post Code' value={userData.post_code} />
          </View>
          <Input title='Coutry' value={userData.country} />
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <Pressable style={styles.updatedButton}>
          <Text style={styles.updatedText}>Update</Text>
        </Pressable>
      </View>
    </>
  )
}

export default settings

const styles = StyleSheet.create({
  container: {
    flex: 1, paddingTop: 32, paddingHorizontal: 24, backgroundColor: 'white'
  },
  headerText: {
    color: '#0C0E16',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 24
  },
  doubleInputContainer: {
    flexDirection: 'row', gap: 24
  },
  mainText: {
    color: '#7C5DFA',
    fontSize: 15,
    fontWeight: '700',
  },
  bottomContainer: {
    height: 91, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingVertical: 21, paddingHorizontal: 24, gap: 8, justifyContent: 'center',
  },
  updatedButton: {
    backgroundColor: '#7C5DFA', width: 112, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center',
  },
  updatedText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
})