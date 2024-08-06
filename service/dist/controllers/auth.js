"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.status = exports.token = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const permissions_1 = __importDefault(require("../models/permissions"));
const login = async (req, res, next) => {
    const { account, password } = req.body;
    try {
        user_1.default.findOne({ where: { account: account } })
            .then((user) => {
            if (!user) {
                return res.json({
                    code: 401,
                    status: "warning",
                    data: null,
                    message: "帳號錯誤，請重新輸入。",
                });
            }
            else if (password !== user.dataValues.password) {
                return res.json({
                    code: 401,
                    data: null,
                    status: "warning",
                    message: "密碼錯誤，請重新輸入。",
                });
            }
            else {
                const accessToken = generateAccessToken(user.dataValues.uid);
                const refreshToken = generateRefreshToken(user.dataValues.uid);
                return res.json({
                    code: 200,
                    status: "success",
                    data: {
                        uid: user.dataValues.uid,
                        account: user.dataValues.account,
                        name: user.dataValues.name,
                        role: user.dataValues.role,
                        accessToken,
                        refreshToken,
                    },
                    message: "登入成功",
                });
            }
        })
            .catch((err) => {
            return res.json({
                code: 500,
                status: "error",
                data: null,
                message: `登入時發生問題。 ${err}`,
            });
        });
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `登入時發生問題。 ${err}`,
        });
    }
};
exports.login = login;
const token = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (token === null) {
            return res.json({
                code: 500,
                status: "error",
                data: null,
                message: `請帶入對應參數 token。`,
            });
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
            if (err) {
                return res.json({
                    code: 500,
                    status: "error",
                    data: null,
                    message: `取得 token 發生錯誤 ${err}`,
                });
            }
            const accessToken = generateAccessToken(user.id);
            return res.json({
                code: 200,
                status: "success",
                data: accessToken,
                message: `取得 token 成功。`,
            });
        });
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `取得 token 發生錯誤 ${err}`,
        });
    }
};
exports.token = token;
const status = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.json({
                code: 500,
                status: "error",
                data: null,
                message: `header 沒有參數`,
            });
        }
        else {
            jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
                if (err)
                    return res.sendStatus(403);
                const accessToken = generateAccessToken(user.id);
                permissions_1.default.findOne({ where: { uid: user.id } })
                    .then((permission) => {
                    let permissionData = permission === null || permission === void 0 ? void 0 : permission.dataValues;
                    permissionData === null || permissionData === void 0 ? true : delete permissionData.uid;
                    permissionData === null || permissionData === void 0 ? true : delete permissionData.pid;
                    permissionData === null || permissionData === void 0 ? true : delete permissionData.createdAt;
                    permissionData === null || permissionData === void 0 ? true : delete permissionData.updatedAt;
                    user_1.default.findOne({ where: { uid: user.id } })
                        .then((user_data) => {
                        res.status(200).json({
                            status: 200,
                            data: {
                                uid: user_data.uid,
                                account: user_data.account,
                                name: user_data.name,
                                role: user_data.role,
                                token: accessToken,
                                permission: permissionData,
                            },
                        });
                    })
                        .catch((err) => {
                        return res.json({
                            code: 500,
                            status: "error",
                            data: null,
                            message: `取得狀態發生問題 ${err}。`,
                        });
                    });
                })
                    .catch((err) => {
                    return res.json({
                        code: 500,
                        status: "error",
                        data: null,
                        message: `取得狀態發生問題 ${err}。`,
                    });
                });
            });
        }
    }
    catch (err) {
        return res.json({
            code: 500,
            status: "error",
            data: null,
            message: `取得狀態發生問題 ${err}。`,
        });
    }
};
exports.status = status;
const generateAccessToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_ACCESS_SECRET, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: "3650d",
    });
};
const generateRefreshToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_REFRESH_SECRET, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: "90d",
    });
};
