import supabase from "../config/supabase"

export const GET_Invoices = async () => {
  const { data, error } = await supabase
    .from('Invoice')
    .select(`
      id, payment_due, status, invoice_total,
      Client (name)
    `)

  return { data, error }
}

export const GET_Invoice_Detail = async (id: string) => {
  const { data, error } = await supabase
    .from('Invoice')
    .select(`
      id, status, description, created_at, payment_due, invoice_total,
      Client (name, email, street, city, post_code, country),
      Sender (street, city, post_code, country),
      Item (name, quantity, price, total)
    `)
    .eq('id', id)

  return { data, error }
}

export const POST_Invoice = async (
  id: string,
  created_at: string,
  payment_due: string,
  description: string,
  payment_terms: number,
  sender_id: string,
  client_id: string,
  invoice_total: number
) => {
  const { data, error } = await supabase
    .from('Invoice')
    .insert({
      id: id,
      created_at: created_at,
      payment_due: payment_due,
      description: description,
      payment_terms: payment_terms,
      status: 'pending',
      sender_id: sender_id,
      client_id: client_id,
      invoice_total: invoice_total,
    })
  
  return { data, error }
}

export const PUT_InvoicePaid = async (id: string) => {
  const { data, error } = await supabase
    .from('Invoice')
    .update({ status: 'paid' })
    .eq('id', id)
  
  return { data, error }
}

export const DELETE_Invoice = async (id: string) => {
  const { data, error } = await supabase
    .from('Invoice')
    .delete()
    .eq('id', id)
  
  return { data, error }
}