import mongoose, { Schema, Document } from 'mongoose';

interface Transaction extends Document {
  transactionID: string;
  merchantID: string;
  date: string;
  amount: {
    value: number;
    currency: string;
  };
  transactionType: string;
}

const TransactionSchema: Schema = new Schema({
  transactionID: String,
  merchantID: String,
  date: String,
  amount: {
    value: Number,
    currency: String,
  },
  transactionType: String,
});

export const TransactionModel = mongoose.model<Transaction>('Transaction', TransactionSchema);
