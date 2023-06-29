import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import GoBackButton from '../../components/GoBackButton'
import Input from '../../components/Input'
import InvoiceItem from '../../components/InvoiceItem'
import { useRouter } from 'expo-router'
import { Item } from '../../types'
import { generateRandomInvoiceID, getTodayDateFormatted } from '../../utils'
import supabase from '../../config/supabase'
import { userData } from '../../data'
import { Image } from 'expo-image'

const createInvoice = () => {
  const router = useRouter()
  const [randomInvoiceID, setRandomInvoiceID] = useState<string>('')
  const [todayFormattedDate, setTodayFormattedDate] = useState<string>('')

  useEffect(() => {
    setRandomInvoiceID(generateRandomInvoiceID())
    setTodayFormattedDate(getTodayDateFormatted())
  },[])

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
  const [items, setItems] = useState<Item[]>([])

  const goToSettings = () => {
    router.push('/settings')
  }

  const addNewItem = () => {
    setItems(prev => prev.concat({ name: '', quantity: '', price: '', total: '', invoice_id: randomInvoiceID }))
    // setItems([...items, { name: '', quantity: '', price: '' }])
  }

  const discard = () => {
    router.push('/')
  }

  const saveDraft = () => {
    console.log('Save Draft')
  }

  const saveSend = () => {
    const totalInvoice = items.reduce((total, item) => total + Number(item.total), 0)

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
          sender_id: userData.id,
          // hardcoded client id for now, should be selected from a list
          client_id: '76ca02b1-f20e-44c8-9701-c3872f185630', 
          invoice_total: totalInvoice,
        })
      
      if (error) alert(error.message)
    }

    const POST_Item = async () => {
      const { data, error } = await supabase
        .from('Item')
        .insert(items)

      if (error) alert(error.message)
    }
    
    if (invoiceDate !== '' && projectDescription !== '' && paymentTerms !== '' && items.length > 0) {
      POST_Invoice()
      .then(() => POST_Item())
      .then(() => router.push('/'))
    }
  }

  return (
    <>
      <View style={styles.container}>
        <GoBackButton />
        <Text style={styles.headerText}>New Invoice</Text>
        <ScrollView style={{ marginVertical: 24 }} contentContainerStyle={{ gap: 24 }}>
          <Text style={styles.IDText}><Text style={{ color: '#7E88C3' }}>#</Text>{randomInvoiceID}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.mainText}>Bill From</Text>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <Pressable onPress={goToSettings}>
                <Text style={styles.mainTextBlack}>Edit in Settings</Text>
              </Pressable>
              <Image style={styles.icons} source={require('../../assets/images/icon-arrow-right.svg')} />
            </View>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.subText}>{userData.name}</Text>
            <Text style={styles.subText}>{userData.email}</Text>
            <Text style={styles.subText}>{userData.street}</Text>
            <View style={{flexDirection: 'row', gap: 8}}>
              <Text style={styles.subText}>{userData.city}</Text>
              <Text style={styles.subText}>{userData.post_code}</Text>
            </View>
            <Text style={styles.subText}>{userData.country}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.mainText}>Bill To</Text>
            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
              <Image style={styles.icons} source={require('../../assets/images/icon-plus.svg')} />
              <Text style={styles.mainTextBlack}>Create New Client</Text>
            </View>
          </View>
          <Input title='Client Name' value={clientName} setValue={setClientName} />
          <Input title='Client Email' value={clientEmail} setValue={setClientEmail} type='email' />
          <Input title='Client Street Address' value={clientStreetAddress} setValue={setClientStreetAddress} />
          <View style={styles.doubleInputContainer}>
            <Input title='Client City' value={cleintCity} setValue={setCleintCity} />
            <Input title='Client Post Code' value={clientPostCode} setValue={setClientPostCode} />
          </View>
          <Input title='Client Coutry' value={clientCountry} setValue={setClientCountry} />
          <Text style={styles.mainText}>Invoice Details</Text>
          <Input title='Invoice Date (YYYY-MM-DD)' value={invoiceDate} setValue={setInvoiceDate} />
          <Input title='Payment Terms' value={paymentTerms} setValue={setPaymentTerms} />
          <Input title='Project Description' value={projectDescription} setValue={setProjectDescription} />
          <Text style={styles.mainText}>Item List</Text>
          {items.map((item, index) => 
            <InvoiceItem
              key={index} index={index} items={items} setItems={setItems}
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
  IDText: {
    fontSize: 15, color: '#0C0E16', fontWeight: '700'
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
  mainTextBlack: {
    color: '#0C0E16',
    fontSize: 13,
    fontWeight: '500',
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
  subText: {
    color: '#7E88C3',
    fontSize: 13,
    fontWeight: '500',
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
  userInfoContainer: {
    gap: 8
  },
  icons: {
    width: 8, height: 8
  },
})