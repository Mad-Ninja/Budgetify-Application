export interface ITransaction {
  id: string;
  type: string;
  amount: number;
  category: string;
  title: string;
  dateOfPayment: string;
  payee: string;
  description: string;
  currency: string;
  createdAt: string;
  updateAt: string;
  accountId: string;
}
