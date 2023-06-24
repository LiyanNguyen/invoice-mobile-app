import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

type Props = {
  status: string | 'paid' | 'pending' | 'draft'
}

const InvoiceStatus = (props: Props) => {
  const { status } = props
  const [bgColor, setBgColor] = useState('white')
  const [color, setColor] = useState('white')

  useEffect(() => {
    if (status === 'paid') { setBgColor('#F3FDFA'); setColor('#33D69F') }
    else if (status === 'pending') { setBgColor('#FFF9F0'); setColor('#FF8F00') }
    else if (status === 'draft') { setBgColor('#F4F4F5'); setColor('#373B53') }
  }, [])
  
  return (
    <View style={[styles.invoiceStatusContainer, { backgroundColor: bgColor }]}>
      <View style={[styles.circle, { backgroundColor: color }]} />
      <Text style={[styles.statusText, { color: color }]}>{status}</Text>
    </View>
  )
}

export default InvoiceStatus

const styles = StyleSheet.create({
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