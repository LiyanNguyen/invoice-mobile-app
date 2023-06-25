export interface Item {
  name: string
  quantity: string
  price: string
  total: string
}

export interface Client {
  name: string
  email: string
  street: string
  city: string
  post_code: string
  country: string
}

export interface Sender extends Client { }

export interface Invoice {
  id: string
  status: 'pending' | 'paid' | 'draft'
  description: string
  created_at: string
  payment_due: string
  invoice_total: number
  paymentTerms: number | 1 | 7 | 14 | 30
  total: number
  Client: Client
  Sender: Sender
  Item: Item[]
}
