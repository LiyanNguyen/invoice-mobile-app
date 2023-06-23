import { View, StyleSheet, FlatList } from "react-native";
import InvoiceBar from "./components/InvoiceBar";
import InvoiceCard from "./components/InvoiceCard";
import fakeData from './data/data.json'
import React from "react";
import InvoiceEmpty from "./components/InvoiceEmpty";

const Home = () => {
  return (
    <View style={styles.container}>
      <InvoiceBar />
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={fakeData}
        renderItem={({ item }) => <InvoiceCard id={item.id} clientName={item.clientName} paymentDue={item.paymentDue} total={item.total} status={item.status} />}
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