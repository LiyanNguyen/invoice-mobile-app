import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from './Input'
import { Image } from 'expo-image'
import { Item } from '../types'

type Props = {
  index: number
  items: Item[]
  name: string
  quantity: string
  price: string
  total: string
}

const InvoiceItem = (props: Props) => {
  const { index, items } = props
  const [itemName, setItemName] = useState<string>(props.name)
  const [quantity, setQuantity] = useState<string>(props.quantity)
  const [price, setPrice] = useState<string>(props.price)
  const [total, setTotal] = useState<string>(props.total)

  useEffect(() => {
    setTotal(String(Number(quantity) * Number(price)))

    // manipulate the parent array
    const copyOfItems = items
    const targetItem = copyOfItems[index]
    targetItem.name = itemName
    targetItem.quantity = quantity
    targetItem.price = price
    targetItem.total = String(Number(quantity) * Number(price))

  }, [itemName, quantity, price, total])

  return (
    <View style={styles.container}>
      <Input title='Item Name' value={itemName} setValue={setItemName} />
      <View style={styles.bottomContainer}>
        <Input title='Qty.' value={quantity} setValue={setQuantity} type='numeric' />
        <Input title='Price' value={price} setValue={setPrice} type='numeric' />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.total}>{total}</Text>
        </View>
        <Pressable style={styles.deleteButton}>
          <Image style={styles.deleteIcon} source={require('../assets/images/icon-delete.svg')} />
        </Pressable>
      </View>
    </View>
  )
}

export default InvoiceItem

const styles = StyleSheet.create({
  container: {
    gap: 24, borderTopWidth: 1, borderColor: '#7E88C3', paddingVertical: 12
  },
  bottomContainer: {
    flexDirection: 'row', gap: 16
  },
  totalContainer: {
    justifyContent: 'space-between', paddingBottom: 16
  },
  totalText: {
    color: '#7E88C3', fontSize: 13, fontWeight: '500'
  },
  total: {
    color: '#888EB0',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center'
  },
  deleteButton: {
    alignSelf: 'flex-end', marginBottom: 20
  },
  deleteIcon: {
    width: 12, height: 16
  }
})