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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawal = exports.getLoadMyInfo = exports.sendVerifyEmail = exports.verifyEmail = exports.logout = exports.login = exports.getUser = exports.register = void 0;
var User_service_1 = require("../../service/User.service");
var bcrypt_1 = __importDefault(require("bcrypt"));
var crypto_1 = __importDefault(require("crypto"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var apiUtilities_1 = require("../../utilities/apiUtilities");
var ether_1 = require("./../../utilities/ether");
var ipfs_http_client_1 = require("ipfs-http-client");
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, email, password, buffer, client, imageUri, cid, salt, hashPassword, emailToken, privateKey, result, err_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 9, , 10]);
                _a = req.body, id = _a.id, email = _a.email, password = _a.password;
                buffer = (_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.buffer;
                client = (0, ipfs_http_client_1.create)("https://ipfs.infura.io:5001/api/v0");
                imageUri = undefined;
                if (!buffer) return [3 /*break*/, 2];
                return [4 /*yield*/, client.add(buffer)];
            case 1:
                cid = _c.sent();
                imageUri = "https://ipfs.io/ipfs/" + cid.path;
                _c.label = 2;
            case 2: return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 3:
                salt = _c.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
            case 4:
                hashPassword = _c.sent();
                emailToken = crypto_1.default.randomBytes(64).toString("hex");
                privateKey = (0, ether_1.createWallet)();
                return [4 /*yield*/, (0, User_service_1.createUser)({
                        id: id,
                        email: email,
                        password: hashPassword,
                        emailToken: emailToken,
                        isVerified: false,
                        imageUri: imageUri,
                        privateKey: privateKey,
                    })];
            case 5:
                result = _c.sent();
                if (!result.success) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, apiUtilities_1.sendMail)({ email: email, emailToken: emailToken, id: id, host: req.headers.host })];
            case 6:
                _c.sent();
                (0, ether_1.mintToken)(privateKey);
                return [2 /*return*/, res.status(201).json(result)];
            case 7: return [2 /*return*/, res.status(500).json(result)];
            case 8: return [3 /*break*/, 10];
            case 9:
                err_1 = _c.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        data: null,
                        error: err_1,
                    })];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var createToken = function (_a) {
    var id = _a.id;
    var secret = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign({ id: id }, secret, { expiresIn: process.env.TOKEN_EXPIRETIME });
};
// const login = async (req: Request, res: Response) => {
//     const { id, password } = req.body;
//     const result = await loginCheckUser({ id, password });
//     if (result.success) {
//         const { user: { nickname } } = result.data;
//         const token = createToken({ id, nickname })
//         res.cookie('access-token', token, {
//             secure: true,
//             httpOnly: true,
//             maxAge: 3600000
//         })
//         // res.redirect('/dashboard')
//         return res.status(201).json(result);
//     }
//     else {
//         return res.status(500).json(result)
//     }
// }
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, password, result, token, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, id = _a.id, password = _a.password;
                return [4 /*yield*/, (0, User_service_1.loginCheckUser)({ id: id, password: password })];
            case 1:
                result = _b.sent();
                if (result.success) {
                    token = createToken({ id: id });
                    return [2 /*return*/, res.status(201).json({
                            success: true,
                            data: {
                                token: token,
                            },
                            error: null,
                        })];
                }
                else {
                    return [2 /*return*/, res.status(500).json({
                            success: false,
                            data: null,
                            error: "로그인 실패",
                        })];
                }
                return [3 /*break*/, 3];
            case 2:
                err_2 = _b.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        data: null,
                        error: err_2,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var getLoadMyInfo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, imageUri, email, role, uuid, createAt, isVerified, tokenBalance;
    return __generator(this, function (_b) {
        try {
            _a = req === null || req === void 0 ? void 0 : req.user, id = _a.id, imageUri = _a.imageUri, email = _a.email, role = _a.role, uuid = _a.uuid, createAt = _a.createAt, isVerified = _a.isVerified, tokenBalance = _a.tokenBalance;
            return [2 /*return*/, res.status(201).json({
                    success: true,
                    data: {
                        id: id,
                        imageUri: imageUri,
                        email: email,
                        role: role,
                        uuid: uuid,
                        createAt: createAt,
                        isVerified: isVerified,
                        tokenBalance: tokenBalance,
                    },
                    error: null,
                })];
        }
        catch (err) {
            return [2 /*return*/, res.status(500).json({
                    success: false,
                    data: null,
                    error: err,
                })];
        }
        return [2 /*return*/];
    });
}); };
exports.getLoadMyInfo = getLoadMyInfo;
var verifyEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var emailToken, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                emailToken = req.query.token;
                if (process.env.NODE_ENV !== "production")
                    console.log(emailToken);
                return [4 /*yield*/, (0, User_service_1.verifyEmailUser)({ emailToken: emailToken })];
            case 1:
                result = _a.sent();
                if (result.success) {
                    return [2 /*return*/, res.status(201).redirect("/")];
                }
                else {
                    return [2 /*return*/, res.status(500).redirect("/")];
                }
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        data: null,
                        error: err_3,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.verifyEmail = verifyEmail;
var sendVerifyEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, email, host, emailToken, result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                id = req.user.id;
                email = req.body.email;
                host = req.headers.host;
                emailToken = crypto_1.default.randomBytes(64).toString("hex");
                return [4 /*yield*/, (0, User_service_1.updateUser)({ id: id, email: email, emailToken: emailToken })];
            case 1:
                result = _a.sent();
                if (process.env.NODE_ENV !== "production")
                    console.log("update User", result);
                if (!result.success) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, apiUtilities_1.sendMail)({ host: host, email: email, emailToken: emailToken, id: id })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(201).json({
                        success: true,
                        message: "인증메일을 보냈습니다.",
                    })];
            case 3: return [2 /*return*/, res.status(201).json({
                    success: false,
                    message: "인증 메일 보내기에 실패하였습니다.",
                })];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        data: null,
                        error: err_4,
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.sendVerifyEmail = sendVerifyEmail;
var logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.cookie("refresh-token", "", { maxAge: 1 });
        res.status(201).json({ success: true });
        return [2 /*return*/];
    });
}); };
exports.logout = logout;
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.user.id;
                if (process.env.NODE_ENV !== "production")
                    console.log(id);
                return [4 /*yield*/, (0, User_service_1.getUserFromId)({ id: id })];
            case 1:
                result = _a.sent();
                if (result.success) {
                    return [2 /*return*/, res.status(201).json(result)];
                }
                else {
                    return [2 /*return*/, res.status(500).json(result)];
                }
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        data: null,
                        error: err_5,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var withdrawal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.user.id;
                return [4 /*yield*/, (0, User_service_1.deleteUserFromId)(id)];
            case 1:
                result = _a.sent();
                if (result.success) {
                    return [2 /*return*/, res.status(201).json(result)];
                }
                else {
                    return [2 /*return*/, res.status(500).json(result)];
                }
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        data: null,
                        error: err_6,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.withdrawal = withdrawal;
//# sourceMappingURL=User.controller.js.map