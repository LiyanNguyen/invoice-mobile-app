import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
  title: string
  value: string
  setValue: Dispatch<SetStateAction<string>>
  placeholder?: string
  type?: 'text' | 'numeric' | 'email'
}

const Input = (props: Props) => {
  const { title, value, setValue, placeholder, type } = props
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.labelText}>{title}</Text>
      <TextInput
        inputMode={type}
        style={[styles.input, {fontWeight: value === '' ? '400' : '700'}]}
        onChangeText={setValue}
        value={value}
        placeholder={placeholder}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  inputContainer: {
    gap: 8,
    flex: 1,
  },
  labelText: {
    color: '#7E88C3',
    fontSize: 13,
    fontWeight: '500',
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#DFE3FA',
    color: '#0C0E16',
    fontSize: 15,
  },
})