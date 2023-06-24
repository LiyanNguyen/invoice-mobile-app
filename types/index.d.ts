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
  postCode: string
  country: string
}

export interface Sender extends Client { }

export interface Invoice {
  id: string
  createdAt: string
  paymentDue: string
  description: string
  paymentTerms: number | 1 | 7 | 14 | 30
  total: number
  client: Client
  sender: Sender
  items: Item[]
}
