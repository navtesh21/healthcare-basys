"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const authrequest_1 = __importDefault(require("../../db/schemas/authrequest"));
const router = (0, express_1.Router)();
router.post("/create", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.user._id) {
        res.json({ message: "unauthorized" });
    }
    try {
        const data = yield authrequest_1.default.create({
            patientID: req.body.patientID,
            timestamp: req.body.timestamp,
            treatmentDetails: req.body.treatmentDetails,
            status: req.body.status,
            treatmentType: req.body.treatmentType,
            insurancePlan: req.body.insurancePlan,
            diagnosisCode: req.body.diagnosisCode,
            doctorId: res.locals.user._id,
        });
        console.log(data);
        res.json({ message: "data inserted" });
    }
    catch (error) {
        console.log(error);
    }
}));
router.get("/all", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.user._id) {
        res.json({ message: "unauthorized" });
    }
    try {
        const data = authrequest_1.default
            .where({ doctorId: res.locals.user._id })
            .populate({ path: "patientID" }) // key to populate
            .then((user) => {
            console.log(user);
            res.json(user);
        });
    }
    catch (error) {
        console.log(error);
        res.json({ message: "server error" });
    }
}));
exports.default = router;
