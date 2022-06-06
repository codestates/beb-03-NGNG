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
exports.uploadImage = exports.isNotEmailVerified = exports.emailVerified = exports.loginRequired = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_service_1 = require("../../service/User.service");
var multer_1 = __importDefault(require("multer"));
var ether_1 = require("../../utilities/ether");
var ethers_1 = require("ethers");
var loginRequired = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, bearerHeader, bearer, secret, validateToken, result, _a, id, imageUri, email, role, uuid_1, createAt, isVerified, privateKey, tokenBalance, err_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                token = null;
                bearerHeader = req === null || req === void 0 ? void 0 : req.headers["authorization"];
                if (process.env.NODE_ENV !== "production")
                    console.log(bearerHeader);
                if (bearerHeader === undefined)
                    throw "token not found";
                bearer = bearerHeader.split(" ");
                if (bearer.length === 2) {
                    token = bearer[1];
                }
                secret = process.env.JWT_SECRET;
                validateToken = jsonwebtoken_1.default.verify(token, secret);
                if (process.env.NODE_ENV !== "production")
                    console.log("validateToken : ", validateToken);
                if (!validateToken) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, User_service_1.getUserFromId)({ id: validateToken === null || validateToken === void 0 ? void 0 : validateToken.id })];
            case 1:
                result = _c.sent();
                if (result.success === false)
                    throw "db에 id가 없음";
                _a = (_b = result === null || result === void 0 ? void 0 : result.data) === null || _b === void 0 ? void 0 : _b.user, id = _a.id, imageUri = _a.imageUri, email = _a.email, role = _a.role, uuid_1 = _a.uuid, createAt = _a.createAt, isVerified = _a.isVerified, privateKey = _a.privateKey;
                return [4 /*yield*/, (0, ether_1.getBalance)(privateKey)];
            case 2:
                tokenBalance = _c.sent();
                tokenBalance = ethers_1.ethers.utils.formatEther(tokenBalance);
                if (process.env.NODE_ENV !== "production")
                    console.log(tokenBalance);
                req.user = {
                    id: id,
                    imageUri: imageUri,
                    email: email,
                    role: role,
                    uuid: uuid_1,
                    createAt: createAt,
                    isVerified: isVerified,
                    privateKey: privateKey,
                    tokenBalance: tokenBalance,
                };
                next();
                return [3 /*break*/, 4];
            case 3: throw "token expires";
            case 4: return [3 /*break*/, 6];
            case 5:
                err_1 = _c.sent();
                console.log(err_1);
                res.status(401).json({
                    success: false,
                    data: null,
                    message: err_1,
                    redirect: "/logout",
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.loginRequired = loginRequired;
var emailVerified = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                if (process.env.NODE_ENV !== "production")
                    console.log(id);
                return [4 /*yield*/, (0, User_service_1.checkEmailVerifyFromId)({ id: id })];
            case 1:
                result = _a.sent();
                if (result.success) {
                    next();
                }
                else {
                    if (process.env.NODE_ENV !== "production")
                        console.log(result.error);
                    return [2 /*return*/, res.status(500).json(result)];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.emailVerified = emailVerified;
var isNotEmailVerified = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                if (process.env.NODE_ENV !== "production")
                    console.log(id);
                return [4 /*yield*/, (0, User_service_1.checkEmailVerifyFromId)({ id: id })];
            case 1:
                result = _a.sent();
                if (result.success) {
                    result.error = "이미 이메일 인증을 받았습니다.";
                    console.log(result.error);
                    return [2 /*return*/, res.status(500).json(result).redirect("/emailVerify")];
                }
                else {
                    next();
                }
                return [2 /*return*/];
        }
    });
}); };
exports.isNotEmailVerified = isNotEmailVerified;
var uploadImage = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});
exports.uploadImage = uploadImage;
//# sourceMappingURL=index.js.map