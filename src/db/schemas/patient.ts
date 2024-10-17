import mongoose, { Document, Mongoose, Schema } from "mongoose";

interface MedicalHistory {
  condition: string;
  date: Date;
  treatment: string;
}

interface LabDetails {
  url: string;
  testName: string;
  date: Date;
}

interface PatientType extends Document {
  name: string;
  age: number;
  medicalHistory: MedicalHistory[];
  treatmentPlan: string;
  labDetails: LabDetails[];
}

const patientSchema: Schema = new Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: { type: String },
  age: { type: Number },
  treatmentPlan: { type: String },
  medicalHistory: [
    {
      condition: { type: String },
      date: Date,
      treatment: { type: String },
    },
  ],
  labDetails: [
    {
      url: { type: String },
      date: Date,
      testName: { type: String },
    },
  ],
});

export default mongoose.model<PatientType>("patient", patientSchema);
