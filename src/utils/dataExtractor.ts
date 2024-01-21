export function extractTransactionData(inputData: any): any | undefined {
  try {
    // Example: Extracting date, amount, merchantID, transactionID, and transactionType
    const date = inputData?.date;
    const amount = inputData?.amount;
    const merchantID = inputData?.merchantID;
    const transactionID = inputData?.transactionID;
    const transactionType = inputData?.transactionType;

    // Validate that essential properties are present
    if (
      date === undefined ||
      amount === undefined ||
      merchantID === undefined ||
      transactionID === undefined ||
      transactionType === undefined
    ) {
      throw new Error("Incomplete or invalid data received");
    }

    return {
      date,
      amount,
      merchantID,
      transactionID,
      transactionType,
    };
  } catch (error:any) {
    console.error("Error extracting transaction data:", error.message);
    return undefined;
  }
}

// dataExtractor.ts

export const extractPayoutData = (payload: any): any => {
  try {
    const date = payload.date;
    const partialAmount = payload.partialAmount;
    const transactionID = payload.transactionID;
    const merchantID = payload.merchantID;
    const splitID = payload.splitID;
    const destinationAccount = payload.destinationAccount;

    if (!date || !partialAmount || !transactionID || !merchantID || !splitID || !destinationAccount) {
      throw new Error('Incomplete or invalid data received');
    }

    return {
      date,
      partialAmount,
      transactionID,
      merchantID,
      splitID,
      destinationAccount,
    };
  } catch (error:any) {
    console.error('Error extracting payout data:', error.message);
    throw error;
  }
};

export function extractReportData(reportData: any) {
  return reportData;
}
