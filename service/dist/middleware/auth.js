"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const verify = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ errors: "Unauthorized" });
    }
    try {
        const decoded_token = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
        if (!decoded_token) {
            return res.json({
                code: 401,
                data: null,
                status: "warning",
                message: "Unauthorized",
            });
        }
        else {
            user_1.default.findOne({ where: { uid: decoded_token.id } }).then((user) => {
                if (user) {
                    req.user = {
                        name: user.name,
                        uid: user.uid,
                    };
                    next();
                }
                else {
                    return res.json({
                        code: 401,
                        data: null,
                        status: "warning",
                        message: "Unauthorized",
                    });
                }
            });
        }
        // req.user = decoded_token;
    }
    catch (err) {
        return res.json({
            code: 401,
            data: null,
            status: "warning",
            message: "Unauthorized",
        });
    }
};
exports.verify = verify;
