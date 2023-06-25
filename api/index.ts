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