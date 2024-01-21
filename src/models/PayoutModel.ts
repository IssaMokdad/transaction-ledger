import mongoose, { Schema, Document } from 'mongoose';

interface Payout extends Document {
  transactionID: string;
  merchantID: string;
  date: string;
  partialAmount: number;
  splitID: string;
  destinationAccount: string;
}

const PayoutSchema: Schema = new Schema({
  transactionID: String,
  merchantID: String,
  date: String,
  partialAmount: Number,
  splitID: String,
  destinationAccount: String,
});

export const PayoutModel = mongoose.model<Payout>('Payout', PayoutSchema);
