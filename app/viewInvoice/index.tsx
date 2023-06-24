import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import InvoiceStatus from '../../components/InvoiceStatus'
import BackToHomeButton from '../../components/BackToHomeButton'

const viewInvoice = () => {
  const params = useLocalSearchParams()
  const { id } = params //id used to fetch GET entire data about a specific invoice
  
  return (
    <>
      <View style={styles.container}>
        <BackToHomeButton/>
        <ScrollView style={styles.infoCardsContainer}>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Status</Text>
            <InvoiceStatus status='pending' />
          </View>
          <View style={styles.infoContainer}>
            <View style={{gap: 4}}>
              <Text style={styles.blackText}><Text style={{ color: '#7E88C3'}}>#</Text>XM9141</Text>
              <Text style={styles.subText}>Graphic Design</Text>
            </View>
            <View style={styles.senderInfoContainer}>
              <Text style={styles.subText}>19 Union Terrace</Text>
              <Text style={styles.subText}>London</Text>
              <Text style={styles.subText}>E1 3EZ</Text>
              <Text style={styles.subText}>United Kingdom</Text>
            </View>
            <View style={styles.billerInfoContainer}>
              <View style={{ gap: 32 }}>
                <View style={{gap: 4}}>
                  <Text style={styles.subText}>Invoice Date</Text>
                  <Text style={styles.blackText}>21 Aug 2021</Text>
                </View>
                <View style={{ gap: 4}}>
                  <Text style={styles.subText}>Payment Due</Text>
                  <Text style={styles.blackText}>20 Sep 2021</Text>
                </View>
              </View>
              <View style={{gap: 4}}>
                <Text style={styles.subText}>Bill To</Text>
                <Text style={styles.blackText}>Alex Grim</Text>
                <Text style={styles.subText}>84 Church Way</Text>
                <Text style={styles.subText}>Bradford</Text>
                <Text style={styles.subText}>BD1 9PB</Text>
                <Text style={styles.subText}>United Kingdom</Text>
              </View>
            </View>
            <View style={{ marginTop: 32, gap: 4 }}>
              <Text style={styles.subText}>Sent to</Text>
              <Text style={styles.blackText}>alexgrim@mail.com</Text>
            </View>
            <View style={styles.itemsContainer}>
              <View style={styles.item}>
                <View>
                  <Text style={styles.blackText}>Banner Design</Text>
                  <Text style={styles.subText2}>1 x £ 156.00</Text>
                </View>
                <Text style={styles.blackText}>£ 156.00</Text>
              </View>
              <View style={styles.item}>
                <View>
                  <Text style={styles.blackText}>Email Design</Text>
                  <Text style={styles.subText2}>2 x £ 200.00</Text>
                </View>
                <Text style={styles.blackText}>£ 400.00</Text>
              </View>
            </View>
            <View style={styles.grandTotalContainer}>
              <Text style={styles.grandTotalText}>Grand Total</Text>
              <Text style={styles.grandTotal}>£ 556.00</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <Pressable style={styles.editButton}>
          <Text style={styles.subText2}>Edit</Text>
        </Pressable>
        <Pressable style={styles.deleteButton}>
          <Text style={styles.whiteText}>Delete</Text>
        </Pressable>
        <Pressable style={styles.paidButton}>
          <Text style={styles.whiteText}>Mark as Paid</Text>
        </Pressable>
      </View>
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
    width: 149, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 24, backgroundColor: '#7C5DFA'
  },
})