import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

type Props = {
  id: string
  clientName: string
  paymentDue: string
  total: number
  status: string | 'paid' | 'pending' | 'draft'
}

const InvoiceCard = (props: Props) => {
  const { id, clientName, paymentDue, total, status } = props
  const [bgColor, setBgColor] = useState('')
  const [color, setColor] = useState('')

  useEffect(() => {
    if (status === 'paid') { setBgColor('#F3FDFA'); setColor('#33D69F') }
    else if (status === 'pending') { setBgColor('#FFF9F0'); setColor('#FF8F00') }
    else if (status === 'draft') { setBgColor('#F4F4F5'); setColor('#373B53') }
  }, [])
  
  return (
    <View style={styles.invoiceCard}>
      <View style={styles.userIDContainer}>
        <Text style={styles.IDText}>{id}</Text>
        <Text style={styles.userText}>{clientName}</Text>
      </View>
      <View style={styles.invoiceInfoContainer}>
        <View>
          <Text style={styles.dueDateText}>Due {paymentDue}</Text>
          <Text style={styles.invoiceAmountText}>£ {total}</Text>
        </View>
        <View style={[styles.invoiceStatusContainer, { backgroundColor: bgColor }]}>
          <View style={[styles.circle, {backgroundColor: color}]} />
          <Text style={[styles.statusText, { color: color }]}>{status}</Text>
        </View>
      </View>
    </View>
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
  invoiceStatusContainer: {
    width: 104, height: 40, borderRadius: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8
  },
  circle: {
    width: 8, height: 8, borderRadius: 4
  },
  statusText: {
    fontWeight: '700', fontSize: 15, textTransform: 'capitalize'
  }
})