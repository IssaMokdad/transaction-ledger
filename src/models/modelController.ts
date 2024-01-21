import { TransactionModel } from './TransactionModel';
import { PayoutModel } from './PayoutModel';
import { ReportModel } from './ReportModel';

export async function saveTransaction(data: any) {
  const transaction = new TransactionModel(data);
  await transaction.save();
}

export async function savePayout(data: any) {
  const payout = new PayoutModel(data);
  await payout.save();
}

export async function saveReport(data: any) {
  const report = new ReportModel(data);
  await report.save();
}
