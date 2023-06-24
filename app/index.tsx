import { View, StyleSheet, FlatList } from "react-native"
import InvoiceBar from "../components/InvoiceBar"
import InvoiceCard from "../components/InvoiceCard"
import fakeData from '../data/data.json'
import React, { useEffect } from "react"
import InvoiceEmpty from "../components/InvoiceEmpty"
import supabase from "../config/supabase"

const Home = () => {

  // const GET_Notes = async () => {
  //   const { data, error } = await supabase
  //     .from('Note')
  //     .select()

  //   // return { data, error }
  //   console.log(data)
  // }

  // useEffect(() => {
  //   GET_Notes()
  // },[])

  return (
    <View style={styles.container}>
      <InvoiceBar />
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={fakeData}
        renderItem={({ item }) => <InvoiceCard id={item.id} clientName={item.client.name} paymentDue={item.payment_due} total={item.invoice_total} status={item.status} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={InvoiceEmpty}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1, gap: 32
  },
  listContainer: {
    paddingLeft: 24, paddingRight: 24, gap: 16, paddingBottom: 32
  }
})