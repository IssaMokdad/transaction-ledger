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

async function reconcileTransactions(reportData:any) {
  try {
    // Assuming reportData contains transaction information from the CSV report

    // Retrieve transactions from the database for comparison
    const transactionsFromDB = await TransactionModel.find();

    const matchedTransactions = [];
    const unmatchedTransactions = [];

    // Loop through transactions in the report data
    for (const transactionData of reportData) {
      // Check if the transaction exists in the database
      const matchedTransaction = transactionsFromDB.find((transaction:any) => {
        // You need to define your own matching criteria here
        // For simplicity, let's assume matching based on transaction ID
        return transaction.transactionId === transactionData.transactionId;
      });

      if (matchedTransaction) {
        // If the transaction is found in the database, mark it as matched
        matchedTransactions.push(matchedTransaction);
      } else {
        // If the transaction is not found in the database, mark it as unmatched
        unmatchedTransactions.push(transactionData);
      }
    }

    // You can perform additional reconciliation logic here
    // For example, updating transaction statuses, logging discrepancies, etc.

    // Return reconciliation result
    return {
      success: true,
      matchedTransactions,
      unmatchedTransactions
    };
  } catch (error:any) {
    console.error('Error reconciling transactions:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export { reconcileTransactions };
