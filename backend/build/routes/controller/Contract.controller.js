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
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferToken_controller = exports.mintNFT_controller = void 0;
var ether_1 = require("../../utilities/ether");
var User_service_1 = require("./../../service/User.service");
var mintNFT_controller = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var privateKey, result, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                privateKey = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.privateKey;
                return [4 /*yield*/, (0, ether_1.mintNFT)(privateKey)];
            case 1:
                result = _b.sent();
                if (result) {
                    return [2 /*return*/, res.status(201).json({
                            success: true,
                            data: {
                                transactionHash: result === null || result === void 0 ? void 0 : result.transactionHash,
                            },
                            error: null,
                        })];
                }
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(400).json({
                        success: false,
                        data: null,
                        error: err_1,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.mintNFT_controller = mintNFT_controller;
var transferToken_controller = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var privateKey, recipientUserId, amount, userObj, recipienPrivateKey, transferResult, err_2;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 4, , 5]);
                privateKey = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.privateKey;
                recipientUserId = req === null || req === void 0 ? void 0 : req.body.userId;
                amount = req === null || req === void 0 ? void 0 : req.body.amount;
                return [4 /*yield*/, (0, User_service_1.getUserFromId)({ id: recipientUserId })];
            case 1:
                userObj = _d.sent();
                console.log(userObj);
                recipienPrivateKey = (_c = (_b = userObj === null || userObj === void 0 ? void 0 : userObj.data) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.privateKey;
                if (!userObj) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, ether_1.transferToken)(privateKey, recipienPrivateKey, amount)];
            case 2:
                transferResult = _d.sent();
                return [2 /*return*/, res.status(201).json({
                        success: true,
                        data: {
                            from: transferResult === null || transferResult === void 0 ? void 0 : transferResult.from,
                            to: transferResult === null || transferResult === void 0 ? void 0 : transferResult.to,
                            transactionHash: transferResult === null || transferResult === void 0 ? void 0 : transferResult.transactionHash,
                        },
                        error: null,
                    })];
            case 3: return [3 /*break*/, 5];
            case 4:
                err_2 = _d.sent();
                console.log(err_2);
                return [2 /*return*/, res.status(400).json({
                        success: false,
                        data: null,
                        error: err_2,
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.transferToken_controller = transferToken_controller;
//# sourceMappingURL=Contract.controller.js.map