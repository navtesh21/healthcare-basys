"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const connect_1 = require("./db/connect");
const auth_1 = __importDefault(require("./routes/v1/auth"));
const patients_1 = __importDefault(require("./routes/v1/patients"));
const authRequest_1 = __importDefault(require("./routes/v1/authRequest"));
const app = (0, express_1.default)();
const mongo_uri = process.env.mongo_uri ||
    "mongodb+srv://makennavtesh:f5ZdnC6NwGa8XLV1@cluster0.pb5xy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/healthCare";
(0, connect_1.connectDb)(mongo_uri);
app.use((0, express_1.json)());
app.use("/auth", auth_1.default);
app.use("/patient", patients_1.default);
app.use("/authRequest", authRequest_1.default);
app.listen(3000, () => {
    console.log("connected");
});
