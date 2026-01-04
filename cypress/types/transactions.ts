export interface CreateTransactionInput {
  amount: number
  note: string
  receiverId: string
  type?: 'payment' | 'request'
}
