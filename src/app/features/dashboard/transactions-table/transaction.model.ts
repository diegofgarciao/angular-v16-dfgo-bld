export interface Transaction {
  amount: number;
  createdAt: number;
  id: string;
  paymentMethod: string;
  salesType: string;
  status: string;
  transactionReference: number;
}
