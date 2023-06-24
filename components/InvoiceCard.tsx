import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import InvoiceStatus from './InvoiceStatus'

type Props = {
  id: string
  clientName: string
  paymentDue: string
  total: number
  status: string | 'paid' | 'pending' | 'draft'
}

const InvoiceCard = (props: Props) => {
  const { id, clientName, paymentDue, total, status } = props
  const router = useRouter()

  const viewInvoice = () => {
    router.push({ pathname: '/viewInvoice', params: {id: id}})
  }
  
  return (
    <Pressable style={styles.invoiceCard} onPress={viewInvoice}>
      <View style={styles.userIDContainer}>
        <Text style={styles.IDText}><Text style={{ color: '#7E88C3'}}>#</Text>{id}</Text>
        <Text style={styles.userText}>{clientName}</Text>
      </View>
      <View style={styles.invoiceInfoContainer}>
        <View>
          <Text style={styles.dueDateText}>Due {paymentDue}</Text>
          <Text style={styles.invoiceAmountText}>£ {total}</Text>
        </View>
        <InvoiceStatus status={status} />
      </View>
    </Pressable>
  )
}

export default InvoiceCard

const styles = StyleSheet.create({
  invoiceCard: {
    backgroundColor: 'white', height: 134, borderRadius: 8, padding: 24, justifyContent: 'space-between'
  },
  userIDContainer: {
    flexDirection: 'row', justifyContent: 'space-between'
  },
  IDText: {
    fontSize: 15, color: '#0C0E16', fontWeight: '700'
  },
  userText: {
    color: '#858BB2', fontWeight: '500', fontSize: 13
  },
  invoiceInfoContainer: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  dueDateText: {
    color: '#7E88C3', fontWeight: '500', fontSize: 13, marginBottom: 8
  },
  invoiceAmountText: {
    color: '#0C0E16', fontSize: 15, fontWeight: '700'
  },
  
})