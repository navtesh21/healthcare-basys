import mongoose, { Document, Mongoose, Schema } from "mongoose";

enum status {
  approved,
  pending,
  denied,
}

interface AuthRequestType extends Document {
  patientID: mongoose.Schema.Types.ObjectId;
  treatmentDetails: string;
  requestStatus: status;
  timestamps: Date;
  doctorId: mongoose.Schema.Types.ObjectId;
}

const RequestSchema: Schema = new Schema({
  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
    required: true,
  },
  treatmentType: { type: String },
  insurancePlan: { type: String },
  diagnosisCode: { type: String },
  treatmentDetails: { type: String },
  timestamp: { type: Date },
  status: {
    type: String,
    enum: [status],
    default: "pending",
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

export default mongoose.model<AuthRequestType>("auth_request", RequestSchema);
