import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InvoiceStatus from '../../components/InvoiceStatus'
import GoBackButton from '../../components/GoBackButton'
import DeleteModal from '../../components/DeleteModal'
import { useLocalSearchParams, useRouter } from 'expo-router'
import supabase from '../../config/supabase'
import InvoiceLoading from '../../components/InvoiceLoading'
import { Invoice } from '../../types'

const viewInvoice = () => {
  const params = useLocalSearchParams()
  const { id } = params // id of this specific Invoice
  const [showModal, setShowModal] = useState<boolean>(false)
  const [invoiceData, setInvoiceData] = useState<Invoice>()
  const [isPaid, setIsPaid] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const GET_Invoice_Detail = async (id: string) => {
      const { data, error } = await supabase
        .from('Invoice')
        .select(`
          id, status, description, created_at, payment_due, invoice_total,
          Client (name, email, street, city, post_code, country),
          Sender (street, city, post_code, country),
          Item (name, quantity, price, total)
        `)
        .eq('id', id)

      if (data) {
        const objectData = data.at(0) as unknown as Invoice
        setInvoiceData(objectData)
        setIsPaid(objectData.status === 'paid' ? true : false)
        setIsLoading(false)
      }
      if (error) alert(error.message)
    }

    GET_Invoice_Detail(id as string)
  },[])

  const editInvoice = () => {
    router.push({ pathname: '/editInvoice', params: { id: id } })
  }

  const openDeleteModal = () => {
    setShowModal(true)
  }

  const markInvoicePaid = () => {
    const PUT_InvoicePaid = async () => {
      const { data, error } = await supabase
        .from('Invoice')
        .update({ status: 'paid' })
        .eq('id', id)

      if (error) alert(error.message)
    }

    PUT_InvoicePaid()
    .then(() => router.push('/'))
  }
  
  return (
    <>
      <View style={styles.container}>
        <GoBackButton/>
        {isLoading ? <InvoiceLoading /> : invoiceData &&
          <ScrollView style={styles.infoCardsContainer}>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Status</Text>
            <InvoiceStatus status={invoiceData.status} />
          </View>
          <View style={styles.infoContainer}>
            <View style={{gap: 4}}>
              <Text style={styles.blackText}><Text style={{ color: '#7E88C3' }}>#</Text>{invoiceData.id}</Text>
              <Text style={styles.subText}>{invoiceData.description}</Text>
            </View>
            <View style={styles.senderInfoContainer}>
              <Text style={styles.subText}>{invoiceData.Sender.street}</Text>
              <Text style={styles.subText}>{invoiceData.Sender.city}</Text>
              <Text style={styles.subText}>{invoiceData.Sender.post_code}</Text>
              <Text style={styles.subText}>{invoiceData.Sender.country}</Text>
            </View>
            <View style={styles.billerInfoContainer}>
              <View style={{ gap: 32 }}>
                <View style={{gap: 4}}>
                  <Text style={styles.subText}>Invoice Date</Text>
                  <Text style={styles.blackText}>{invoiceData.created_at}</Text>
                </View>
                <View style={{ gap: 4}}>
                  <Text style={styles.subText}>Payment Due</Text>
                  <Text style={styles.blackText}>{invoiceData.payment_due}</Text>
                </View>
              </View>
              <View style={{gap: 4}}>
                <Text style={styles.subText}>Bill To</Text>
                <Text style={styles.blackText}>{invoiceData.Client.name}</Text>
                <Text style={styles.subText}>{invoiceData.Client.street}</Text>
                <Text style={styles.subText}>{invoiceData.Client.city}</Text>
                <Text style={styles.subText}>{invoiceData.Client.post_code}</Text>
                <Text style={styles.subText}>{invoiceData.Client.country}</Text>
              </View>
            </View>
            <View style={{ marginTop: 32, gap: 4 }}>
              <Text style={styles.subText}>Sent to</Text>
              <Text style={styles.blackText}>{invoiceData.Client.email}</Text>
            </View>
              <View style={styles.itemsContainer}>
                {invoiceData.Item.map(item =>
                  <View key={item.name} style={styles.item}>
                    <View>
                      <Text style={styles.blackText}>{item.name}</Text>
                      <Text style={styles.subText2}>{item.quantity} x £ {item.price}</Text>
                    </View>
                    <Text style={styles.blackText}>£ {item.total}</Text>
                  </View>
                )}
            </View>
            <View style={styles.grandTotalContainer}>
              <Text style={styles.grandTotalText}>Grand Total</Text>
              <Text style={styles.grandTotal}>£ {invoiceData.invoice_total}</Text>
            </View>
          </View>
          </ScrollView>
        }
      </View>
      {invoiceData && 
        <>
          <View style={styles.bottomContainer}>
            <Pressable style={styles.editButton} onPress={editInvoice}>
              <Text style={styles.subText2}>Edit</Text>
            </Pressable>
            <Pressable style={styles.deleteButton} onPress={openDeleteModal}>
              <Text style={styles.whiteText}>Delete</Text>
            </Pressable>
            <Pressable style={[styles.paidButton, { backgroundColor: isPaid ? '#9277FF' : '#7C5DFA' }]}
              onPress={markInvoicePaid} disabled={isPaid}>
              <Text style={styles.whiteText}>{isPaid? 'Already Paid' : 'Mark as Paid'}</Text>
            </Pressable>
          </View>
          <DeleteModal visible={showModal} setVisible={setShowModal}/>
        </>
      }
    </>
  )
}

export default viewInvoice

const styles = StyleSheet.create({
  container: {
    flex: 1, paddingTop: 32, paddingHorizontal:24
  },
  blackText: {
    color: '#0C0E16',
    fontWeight: '700',
    fontSize: 15,
  },
  subText: {
    color: '#7E88C3',
    fontSize: 13,
    fontWeight: '500',
  },
  subText2: {
    color: '#7E88C3',
    fontSize: 15,
    fontWeight: '700'
  },
  infoCardsContainer: {
    marginVertical: 32
  },
  statusContainer: {
    backgroundColor: 'white', borderRadius: 8, padding: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16
  },
  statusText: {
    color: '#858BB2', fontSize: 13, fontWeight: '500'
  },
  infoContainer: {
    backgroundColor: 'white', borderRadius: 8, padding: 24
  },
  senderInfoContainer: {
    marginTop: 32, gap: 4
  },
  billerInfoContainer: {
    marginTop: 32, flexDirection: 'row', justifyContent: 'space-between', gap: 64
  },
  itemsContainer: {
    backgroundColor: '#F9FAFE', marginTop: 38, borderTopLeftRadius: 8, borderTopRightRadius: 8, padding: 24, gap: 24 
  },
  item: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  grandTotalContainer: {
    backgroundColor: '#373B53', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24
  },
  grandTotalText: {
    color: 'white', fontSize: 13, fontWeight: '500'
  },
  grandTotal: {
    color: 'white', fontSize: 24, fontWeight: '700'
  },
  bottomContainer: {
    height: 91, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingVertical: 21, paddingHorizontal: 24, gap: 8, justifyContent: 'space-between'
  },
  editButton: {
    width: 73, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 24, backgroundColor: '#F9FAFE'
  },
  deleteButton: {
    width: 89, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 24, backgroundColor: '#EC5757'
  },
  whiteText: {
    color: 'white', fontSize: 15, fontWeight: '700'
  },
  paidButton: {
    width: 149, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 24
  },
})