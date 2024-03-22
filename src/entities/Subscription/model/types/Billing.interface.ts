export interface Billing {
  id: string
  createdAt: string
  invoiceNumber: string
  orderID: string
  paymentType: string
  paymentDate: string
  paid: boolean
  sum: string
}
