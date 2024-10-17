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
const patient_1 = __importDefault(require("../../db/schemas/patient"));
const router = (0, express_1.Router)();
router.post("/create", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.user._id) {
        res.json({ message: "unauthorized" });
    }
    try {
        const data = yield patient_1.default.create({
            name: req.body.name,
            age: req.body.age,
            treatmentPlan: req.body.treatmentPlan,
            medicalHistory: req.body.medicalHistory,
            labDetails: req.body.labDetails,
            doctorId: res.locals.user._id,
        });
        console.log(data);
        res.json({ message: "data inserted" });
    }
    catch (error) {
        console.log(error);
    }
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield patient_1.default.create({
            name: req.body.name,
            age: req.body.age,
            treatmentPlan: req.body.treatmentPlan,
            medicalHistory: req.body.medicalHistory,
            labDetails: req.body.labDetails,
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
        const data = yield patient_1.default.where({ doctorId: res.locals.user._id });
        res.json({ data });
    }
    catch (error) {
        console.log(error);
        res.json({ message: "server error" });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield patient_1.default.findOne({ _id: req.params.id });
        console.log(data, "lala");
        res.json({ data });
    }
    catch (error) {
        console.log(error);
        res.json({ message: "server error" });
    }
}));
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield patient_1.default.updateOne({ _id: req.params.id }, { name: req.body.name });
        console.log(data, "lala");
        res.json({ data });
    }
    catch (error) {
        console.log(error);
        res.json({ message: "server error" });
    }
}));
exports.default = router;
