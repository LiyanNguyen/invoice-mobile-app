import { View, StyleSheet, FlatList, Text, ActivityIndicator } from "react-native"
import InvoiceBar from "../components/InvoiceBar"
import InvoiceCard from "../components/InvoiceCard"
import React, { useEffect, useState } from "react"
import InvoiceEmpty from "../components/InvoiceEmpty"
import supabase from "../config/supabase"
import InvoiceLoading from "../components/InvoiceLoading"

const Home = () => {
  const [invoices, setInvoices] = useState<any | undefined>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const GET_Invoices = async () => {
      const { data, error } = await supabase
        .from('Invoice')
        .select(`
          id, payment_due, status, invoice_total,
          Client (name)
        `)

      if (data) { setInvoices(data); setIsLoading(false) }
      if (error) alert(error.message)
    }

    GET_Invoices()
  },[])

  return (
    <View style={styles.container}>
      {isLoading ? <InvoiceLoading /> :
        <>
          <InvoiceBar amount={invoices.length} />
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={invoices}
            keyExtractor={item => item.id}
            ListEmptyComponent={InvoiceEmpty}
            renderItem={({ item }) =>
              <InvoiceCard
                id={item.id} clientName={item.Client.name} paymentDue={item.payment_due}
                total={item.invoice_total} status={item.status}
              />
            }
          />
        </>
      }
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