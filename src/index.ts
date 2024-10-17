import express, { json } from "express";
import { connectDb } from "./db/connect";
import authRoute from "./routes/v1/auth";
import patientRoute from "./routes/v1/patients";
import authRequestRoute from "./routes/v1/authRequest";

const app = express();

const mongo_uri =
  process.env.mongo_uri ||
  "mongodb+srv://makennavtesh:f5ZdnC6NwGa8XLV1@cluster0.pb5xy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/healthCare";
connectDb(mongo_uri);
app.use(json());

app.use("/auth", authRoute);
app.use("/patient", patientRoute);
app.use("/authRequest", authRequestRoute);

app.listen(3000, () => {
  console.log("connected");
});
