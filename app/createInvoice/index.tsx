import { ScrollView, StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import BackToHomeButton from '../../components/BackToHomeButton'
import Input from '../../components/Input'

const createInvoice = () => {
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [postCode, setPostCode] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientStreetAddress, setClientStreetAddress] = useState<string>('');
  const [cleintCity, setCleintCity] = useState<string>('');
  const [clientPostCode, setClientPostCode] = useState<string>('');
  const [clientCountry, setClientCountry] = useState<string>('');
  
  const [invoiceDate, setInvoiceDate] = useState<string>('');
  const [paymentTerms, setPaymentTerms] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');

  return (
    <>
      <View style={styles.container}>
        <BackToHomeButton />
        <Text style={styles.headerText}>New Invoice</Text>
        <ScrollView style={{ marginVertical: 24 }} contentContainerStyle={{ gap: 24 }}>
          <Text style={styles.mainText}>Bill From</Text>
          <Input title='Street Address' value={streetAddress} setValue={setStreetAddress} placeholder='19 Union Terrace' />
          <View style={styles.doubleInputContainer}>
            <Input title='City' value={city} setValue={setCity} placeholder='London' />
            <Input title='Post Code' value={postCode} setValue={setPostCode} placeholder='E1 3EZ' />
          </View>
          <Input title='Country' value={country} setValue={setCountry} placeholder='United Kingdom' />
          <Text style={styles.mainText}>Bill To</Text>
          <Input title='Client Name' value={clientName} setValue={setClientName} placeholder='Alex Grim' />
          <Input title='Client Email' value={clientEmail} setValue={setClientEmail} placeholder='alexgrim@mail.com' />
          <Input title='Client Street Address' value={clientStreetAddress} setValue={setClientStreetAddress} placeholder='84 Church Way' />
          <View style={styles.doubleInputContainer}>
            <Input title='Client City' value={cleintCity} setValue={setCleintCity} placeholder='Bradford'/>
            <Input title='Client Post Code' value={clientPostCode} setValue={setClientPostCode} placeholder='BD1 9PB' />
          </View>
          <Input title='Client Coutry' value={clientCountry} setValue={setClientCountry} placeholder='United Kingdom' />
          <Text style={styles.mainText}>Other Details</Text>
          <Input title='Invoice Date' value={invoiceDate} setValue={setInvoiceDate} placeholder='21 Aug 2021'/>
          <Input title='Payment Terms' value={paymentTerms} setValue={setPaymentTerms} placeholder='Net 30 Days' />
          <Input title='Project Description' value={projectDescription} setValue={setProjectDescription} placeholder='Graphic Design'/>
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <Pressable style={styles.discardButton}>
          <Text style={styles.discardText}>Discard</Text>
        </Pressable>
        <Pressable style={styles.saveDraftButton}>
          <Text style={styles.saveDraftText}>Save as Draft</Text>
        </Pressable>
        <Pressable style={styles.saveSendButton}>
          <Text style={styles.saveSendText}>Save & Send</Text>
        </Pressable>
      </View>
    </>
  )
}

export default createInvoice

const styles = StyleSheet.create({
  container: {
    flex: 1, paddingTop: 32, paddingHorizontal: 24
  },
  headerText: {
    color: '#0C0E16',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 24
  },
  mainText: {
    color: '#7C5DFA',
    fontSize: 15,
    fontWeight: '700',
  },
  doubleInputContainer: {
    flexDirection: 'row', gap: 24
  },
  bottomContainer: {
    height: 91, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingVertical: 21, paddingHorizontal: 24, gap: 8, justifyContent: 'space-between'
  },
  discardButton: {
    backgroundColor: '#F9FAFE', width: 84, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center'
  },
  discardText: {
    color: '#7E88C3',
    fontSize: 15,
    fontWeight: '700',
  },
  saveDraftButton: {
    backgroundColor: '#373B53', width: 117, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center'
  },
  saveDraftText: {
    color: '#888EB0',
    fontSize: 15,
    fontWeight: '700',
  },
  saveSendButton: {
    backgroundColor: '#7C5DFA', width: 112, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center'
  },
  saveSendText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
})