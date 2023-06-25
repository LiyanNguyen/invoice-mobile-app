import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'

type Props = {
  amount: number
}

const InvoiceBar = (props: Props) => {
  const { amount } = props
  const router = useRouter()
  
  const addNew = () => {
    router.push({ pathname: '/createInvoice' })
  }

  const openFilters = () => {
    console.log('open filters')
  }


  return (
    <View style={styles.invoiceBar}>
      <View>
        <Text style={styles.invoiceText}>Invoices</Text>
        <Text style={styles.amountInvoiceText}>{amount} Invoices</Text>
      </View>
      <Pressable style={styles.filterButton} onPress={openFilters}>
        <Text style={styles.filterText}>Filter</Text>
        <Image style={styles.arrowDownIcon} source={require('../assets/images/icon-arrow-down.svg')} />
        <Pressable style={styles.newButton} onPress={addNew}>
          <View style={styles.whiteCircle}>
            <Image style={styles.plusIcon} source={require('../assets/images/icon-plus.svg')} />
          </View>
          <Text style={styles.newText}>New</Text>
        </Pressable>
      </Pressable>
    </View>
  )
}

export default InvoiceBar

const styles = StyleSheet.create({
  invoiceBar: {
    marginTop: 32, marginLeft: 24, marginRight: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  invoiceText: {
    color: '#0C0E16', fontWeight: '700', fontSize: 24
  },
  amountInvoiceText: {
    color: '#888EB0', fontWeight: '500', fontSize: 15
  },
  filterButton: {
    flexDirection: 'row', gap: 12, alignItems: 'center'
  },
  filterText: {
    color: '#0C0E16', fontWeight: '700', fontSize: 15
  },
  arrowDownIcon: {
    width: 9, height: 5
  },
  newButton: {
    width: 90, height: 44, backgroundColor: '#7C5DFA', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 24
  },
  whiteCircle: {
    height: 32, width: 32, borderRadius: 16, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'
  },
  plusIcon: {
    width: 10, height: 10
  },
  newText: {
    color: 'white', fontWeight: '500', fontSize: 15
  }
})