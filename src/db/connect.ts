import mongoose from "mongoose";
export function connectDb(mongo_uri: string) {
  mongoose
    .connect(mongo_uri)
    .then(() => {
      console.log("db connected");
    })
    .catch((e) => console.error(e));
}
