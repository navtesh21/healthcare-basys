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
const user_1 = __importDefault(require("../../db/schemas/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = "secret";
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        const data = yield user_1.default.create({
            email,
            password: hashedPassword,
        });
        console.log(data);
        res.status(400).json({
            message: "user created",
        });
    }
    catch (error) {
        console.error(error);
        res.status(411).json({
            message: "server error",
        });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const data = yield user_1.default.findOne({ email });
    console.log(data);
    if (!data) {
        res.status(404).json({ message: "user not found" });
    }
    const hashedPassword = yield bcrypt_1.default.compare(password, (data === null || data === void 0 ? void 0 : data.password) || "");
    if (!hashedPassword) {
        res.status(411).json({ message: "incorrect password" });
    }
    const token = jsonwebtoken_1.default.sign(JSON.stringify(data) || "", secret);
    res.status(200).json({ token });
}));
exports.default = router;
