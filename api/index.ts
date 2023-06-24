import supabase from "../config/supabase"

export const GET_Invoices = async () => {
  const { data, error } = await supabase
    .from('Invoice')
    .select('id, payment_due, Client (name), status, invoice_total')

  return { data, error }
}