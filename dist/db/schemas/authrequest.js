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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
var status;
(function (status) {
    status[status["approved"] = 0] = "approved";
    status[status["pending"] = 1] = "pending";
    status[status["denied"] = 2] = "denied";
})(status || (status = {}));
const RequestSchema = new mongoose_1.Schema({
    patientID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
});
exports.default = mongoose_1.default.model("auth_request", RequestSchema);
