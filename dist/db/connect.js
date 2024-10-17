"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = connectDb;
const mongoose_1 = __importDefault(require("mongoose"));
function connectDb(mongo_uri) {
    mongoose_1.default
        .connect(mongo_uri)
        .then(() => {
        console.log("db connected");
    })
        .catch((e) => console.error(e));
}
