"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_1 = require("./db/connect");
const auth_1 = __importDefault(require("./routes/v1/auth"));
const patients_1 = __importDefault(require("./routes/v1/patients"));
const authRequest_1 = __importDefault(require("./routes/v1/authRequest"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const mongo_uri = process.env.mongo_uri ||
    "mongodb+srv://makennavtesh:f5ZdnC6NwGa8XLV1@cluster0.pb5xy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/healthCare";
(0, connect_1.connectDb)(mongo_uri);
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/patient", patients_1.default);
app.use("/authRequest", authRequest_1.default);
app.listen(3001, () => {
    console.log("connected");
});
