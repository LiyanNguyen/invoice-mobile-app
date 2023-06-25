import { ScrollView, StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import BackToHomeButton from '../../components/BackToHomeButton'
import Input from '../../components/Input'
import InvoiceItem from '../../components/InvoiceItem'
import { useRouter } from 'expo-router'
import { Item } from '../../types'
import { generateRandomInvoiceID, getTodayDateFormatted } from '../../utils'
import supabase from '../../config/supabase'

const createInvoice = () => {
  const router = useRouter()
  
  // Sender
  const [streetAddress, setStreetAddress] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [postCode, setPostCode] = useState<string>('')
  const [country, setCountry] = useState<string>('')

  // Client
  const [clientName, setClientName] = useState<string>('')
  const [clientEmail, setClientEmail] = useState<string>('')
  const [clientStreetAddress, setClientStreetAddress] = useState<string>('')
  const [cleintCity, setCleintCity] = useState<string>('')
  const [clientPostCode, setClientPostCode] = useState<string>('')
  const [clientCountry, setClientCountry] = useState<string>('')
  
  // Invoice
  const [invoiceDate, setInvoiceDate] = useState<string>('')
  const [paymentTerms, setPaymentTerms] = useState<string>('')
  const [projectDescription, setProjectDescription] = useState<string>('')

  // array of new invoice items
  const [items, setItems] = useState<Item[]>([
    { name: '', quantity: '', price: '', total: '' },
  ])

  const addNewItem = () => {
    setItems(prev => prev.concat({ name: '', quantity: '', price: '', total: '' }))
    // setItems([...items, { name: '', quantity: '', price: '' }])
  }

  const discard = () => {
    router.push('/')
  }

  const saveDraft = () => {
    console.log('Save Draft')
  }

  const saveSend = () => {
    const randomInvoiceID = generateRandomInvoiceID()
    const todayFormattedDate = getTodayDateFormatted()

    const POST_Invoice = async () => {
      const { data, error } = await supabase
        .from('Invoice')
        .insert({
          id: randomInvoiceID,
          created_at: todayFormattedDate,
          payment_due: invoiceDate,
          description: projectDescription,
          payment_terms: Number(paymentTerms),
          status: 'pending',
          sender_id: '5c58c942-c99b-4747-b93a-7c84cd532390', // hardcoded sender id for now
          client_id: '76ca02b1-f20e-44c8-9701-c3872f185630', // hardcoded client id for now
          invoice_total: 420.69, // hardcoded for now
        })
      
      console.log(data)
      console.log(error)
    }
    
    // FOR NOW JUST POST THE INVOICE DATA
    if (invoiceDate !== '' && projectDescription !== '' && paymentTerms !== '') {
      POST_Invoice()
    }
  }

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
          <Input title='Client Email' value={clientEmail} setValue={setClientEmail} placeholder='alexgrim@mail.com' type='email' />
          <Input title='Client Street Address' value={clientStreetAddress} setValue={setClientStreetAddress} placeholder='84 Church Way' />
          <View style={styles.doubleInputContainer}>
            <Input title='Client City' value={cleintCity} setValue={setCleintCity} placeholder='Bradford'/>
            <Input title='Client Post Code' value={clientPostCode} setValue={setClientPostCode} placeholder='BD1 9PB' />
          </View>
          <Input title='Client Coutry' value={clientCountry} setValue={setClientCountry} placeholder='United Kingdom' />
          <Text style={styles.mainText}>Other Details</Text>
          <Input title='Invoice Date' value={invoiceDate} setValue={setInvoiceDate} placeholder='21-10-2021'/>
          <Input title='Payment Terms' value={paymentTerms} setValue={setPaymentTerms} placeholder='Net 30 Days' />
          <Input title='Project Description' value={projectDescription} setValue={setProjectDescription} placeholder='Graphic Design' />
          <Text style={styles.mainText}>Item List</Text>
          {items.map((item, index) => 
            <InvoiceItem
              key={index} index={index} items={items}
              name={item.name} quantity={item.quantity} price={item.price} total={item.total}
            />
          )}
          <Pressable style={styles.addNewItemButton} onPress={addNewItem}>
            <Text style={styles.discardText}>+ Add New Item</Text>
          </Pressable>
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <Pressable style={styles.discardButton} onPress={discard}>
          <Text style={styles.discardText}>Discard</Text>
        </Pressable>
        <Pressable style={styles.saveDraftButton} onPress={saveDraft}>
          <Text style={styles.saveDraftText}>Save as Draft</Text>
        </Pressable>
        <Pressable style={styles.saveSendButton} onPress={saveSend}>
          <Text style={styles.saveSendText}>Save & Send</Text>
        </Pressable>
      </View>
    </>
  )
}

export default createInvoice

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
  addNewItemButton: {
    height: 48, borderRadius: 24, backgroundColor: '#F9FAFE', alignItems: 'center', justifyContent: 'center'
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