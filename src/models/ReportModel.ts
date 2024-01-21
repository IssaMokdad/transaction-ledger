import mongoose, { Schema, Document } from 'mongoose';

interface Report extends Document {
  // Define your report model based on the actual structure
}

const ReportSchema: Schema = new Schema({
  // Define your report schema based on the actual structure
});

export const ReportModel = mongoose.model<Report>('Report', ReportSchema);
