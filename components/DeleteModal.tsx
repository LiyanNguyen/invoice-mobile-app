import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import supabase from '../config/supabase'

type Props = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const DeleteModal = (props: Props) => {
  const { visible, setVisible } = props
  const params = useLocalSearchParams()
  const router = useRouter()
  const { id } = params // id of this specific Invoice

  const closeThisModal = () => {
    setVisible(false)
  }

  const deleteInvoice = () => {
    const DELETE_Invoice = async () => {
      const { data, error } = await supabase
        .from('Invoice')
        .delete()
        .eq('id', id)
    }
    
    DELETE_Invoice()
    .then(() => setVisible(false))
    .then(() => router.push('/'))
  }

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={closeThisModal}>
      <View style={styles.backDrop}>
        <View style={styles.modalContainer} >
          <Text style={styles.headerText}>Confirm Deletion</Text>
          <Text style={styles.subText}>Are you sure you want to delete invoice <Text style={styles.IDText}>#{id}</Text> ? This action cannot be undone.</Text>
          <View style={styles.buttonsContainer}>
            <Pressable style={styles.cancelButton} onPress={closeThisModal}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.deleteButton}>
              <Text style={styles.deleteText} onPress={deleteInvoice}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default DeleteModal

const styles = StyleSheet.create({
  backDrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 32,
    alignItems: 'flex-start',
    gap: 8
  },
  headerText: {
    color: '#0C0E16',
    fontWeight: '700',
    fontSize: 24
  },
  subText: {
    color: '#888EB0',
    fontWeight: '500',
    fontSize: 13
  },
  IDText: {
    fontSize: 15, color: '#0C0E16', fontWeight: '700'
  },
  buttonsContainer: {
    flexDirection: 'row', alignSelf: 'flex-end', gap: 8, marginTop: 20
  },
  cancelButton: {
    width: 91, height: 48, backgroundColor: '#F9FAFE', borderRadius: 24, justifyContent: 'center', alignItems: 'center'
  },
  cancelText: {
    color: '#7E88C3', fontWeight: '700', fontSize: 15
  },
  deleteButton: {
    width: 89, height: 48, backgroundColor: '#EC5757', borderRadius: 24, justifyContent: 'center', alignItems: 'center'
  },
  deleteText: {
    color: 'white', fontWeight: '700', fontSize: 15
  }
})