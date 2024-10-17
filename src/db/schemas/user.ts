import mongoose, { Document, mongo, Schema } from "mongoose";

export interface userTyp extends Document {
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
});

export default mongoose.model<userTyp>("user", userSchema);
