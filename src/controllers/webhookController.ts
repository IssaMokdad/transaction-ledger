import express from 'express';
import { Request, Response } from 'express';
import { extractTransactionData, extractPayoutData, extractReportData } from '../utils/dataExtractor';
import { saveTransaction, savePayout, saveReport } from '../models/modelController';

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

export default router;