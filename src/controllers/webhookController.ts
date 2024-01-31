import express from 'express';
import { Request, Response } from 'express';
import { extractTransactionData, extractPayoutData, extractReportData } from '../utils/dataExtractor';
import { saveTransaction, savePayout, reconcileTransactions, saveReport } from '../models/modelController';

const router = express.Router();

router.post('/webhook/transaction', async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const transactionData = extractTransactionData(req.body);
    await saveTransaction(transactionData);
    res.status(200).send('Transaction webhook received and processed successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/webhook/payout', async (req: Request, res: Response) => {
  try {
    const payoutData = extractPayoutData(req.body);
    await savePayout(payoutData);
    res.status(200).send('Payout webhook received and processed successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/end-of-day-report', async (req: Request, res: Response) => {
  try {
    const reportData = extractReportData(req.body);
    await saveReport(reportData);
    res.status(200).send('End-of-day report received and processed successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/reconcile', async (req: Request, res: Response) => {
  try {
    const reportData = req.body; // Assuming reportData is passed in the request body

    // Perform reconciliation
    const reconciliationResult = await reconcileTransactions(reportData);

    if (reconciliationResult.success) {
      res.status(200).json({ message: 'Reconciliation successful', data: reconciliationResult });
    } else {
      res.status(500).json({ error: 'Failed to reconcile transactions', message: reconciliationResult.error });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;