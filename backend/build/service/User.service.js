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
exports.updateUser = exports.checkEmailVerifyFromId = exports.verifyEmailUser = exports.loginCheckUser = exports.deleteUserFromId = exports.getUserFromId = exports.createUser = void 0;
var class_validator_1 = require("class-validator");
var User_1 = require("../typeorm/entity/User");
var bcrypt_1 = __importDefault(require("bcrypt"));
var apiUtilities_1 = require("../utilities/apiUtilities");
var createUser = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
    var id, email, password, emailToken, isVerified, privateKey, imageUri, user, errors, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = userData.id, email = userData.email, password = userData.password, emailToken = userData.emailToken, isVerified = userData.isVerified, privateKey = userData.privateKey, imageUri = userData.imageUri;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                user = User_1.User.create({
                    id: id,
                    email: email,
                    password: password,
                    emailToken: emailToken,
                    isVerified: isVerified,
                    role: 'user',
                    privateKey: privateKey,
                    imageUri: imageUri,
                });
                return [4 /*yield*/, (0, class_validator_1.validate)(user)];
            case 2:
                errors = _a.sent();
                if (errors.length > 0)
                    throw errors;
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, {
                        success: true,
                        data: null,
                        error: null,
                    }];
            case 4:
                err_1 = _a.sent();
                console.log("createUser error check : ", err_1);
                return [2 /*return*/, {
                        success: false,
                        data: null,
                        error: "회원가입 실패"
                    }];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var deleteUserFromId = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, User_1.User.findOneOrFail({ id: userId, role: 'user' })];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, user.remove()];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3: throw "아이디가 없음";
            case 4: return [2 /*return*/, {
                    success: true,
                    data: null,
                    error: null,
                }];
            case 5:
                err_2 = _a.sent();
                return [2 /*return*/, {
                        success: false,
                        data: null,
                        error: "회원탈퇴 실패"
                    }];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteUserFromId = deleteUserFromId;
// const updateUser = async (user: IUser | any): Promise<returnUser> => {
//     const { id, emailToken } = await user;
//     console.log("update User : ", user);
//     try {
//         const errors = await validate(user)
//         if (errors.length > 0) throw errors
//         const result = await getConnection()
//             .createQueryBuilder()
//             .update(User)
//             .set({
//                 emailToken: "asdf",
//                 isVerified: false
//             })
//             .where("id = :id", { id: id })
//             .execute();
//         console.log(result)
//         return {
//             success: true,
//         }
//     } catch (err) {
//         return {
//             success: false,
//             error: "Something went wrong"
//         }
//     }
// }
var updateUser = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var id, email, emailToken, validateUser, errors, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = user.id, email = user.email, emailToken = user.emailToken;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                validateUser = new User_1.User({ id: id, email: email, emailToken: emailToken });
                return [4 /*yield*/, (0, class_validator_1.validate)(validateUser, { skipMissingProperties: true })];
            case 2:
                errors = _a.sent();
                if (errors.length > 0) {
                    throw errors;
                }
                return [4 /*yield*/, User_1.User.update({ id: id }, { emailToken: emailToken, email: email, isVerified: false })];
            case 3:
                _a.sent();
                return [2 /*return*/, {
                        success: true,
                        data: null,
                        error: null,
                    }];
            case 4:
                err_3 = _a.sent();
                console.log("updateUser check error", err_3);
                return [2 /*return*/, {
                        success: false,
                        data: null,
                        error: null,
                    }];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var getUserFromId = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, sanitizeUserData, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = userData.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_1.User.findOneOrFail({ id: id })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, (0, apiUtilities_1.sanitizeUser)(user)];
            case 3:
                sanitizeUserData = _a.sent();
                return [2 /*return*/, {
                        success: true,
                        data: { user: sanitizeUserData },
                        error: null,
                    }];
            case 4:
                err_4 = _a.sent();
                return [2 /*return*/, {
                        success: false,
                        data: null,
                        error: "getUser 에러"
                    }];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getUserFromId = getUserFromId;
var loginCheckUser = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
    var id, password, user, match, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = userData.id, password = userData.password;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_1.User.findOneOrFail({ id: id })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 3:
                match = _a.sent();
                if (!match)
                    throw "비밀번호가 일치하지 않습니다.";
                return [2 /*return*/, {
                        success: true,
                        data: {
                            user: {
                                id: user.id
                            }
                        },
                        error: null,
                    }];
            case 4:
                error_1 = _a.sent();
                return [2 /*return*/, {
                        success: false,
                        data: null,
                        error: error_1
                    }];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginCheckUser = loginCheckUser;
var verifyEmailUser = function (_a) {
    var emailToken = _a.emailToken;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, User_1.User.findOneOrFail({ emailToken: emailToken })];
                case 1:
                    user = _b.sent();
                    user.emailToken = null;
                    user.isVerified = true;
                    return [4 /*yield*/, user.save()];
                case 2:
                    _b.sent();
                    return [2 /*return*/, {
                            success: true,
                            data: null,
                            error: null,
                        }];
                case 3:
                    error_2 = _b.sent();
                    return [2 /*return*/, {
                            success: false,
                            data: null,
                            error: "이메일 인증 실패",
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.verifyEmailUser = verifyEmailUser;
var checkEmailVerifyFromId = function (_a) {
    var id = _a.id;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, User_1.User.findOneOrFail({ id: id })];
                case 1:
                    user = _b.sent();
                    if (user.isVerified) {
                        return [2 /*return*/, {
                                success: true,
                                data: null,
                                error: null,
                            }];
                    }
                    else {
                        return [2 /*return*/, {
                                success: false,
                                data: null,
                                error: "이메일 인증을 받아야 합니다."
                            }];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _b.sent();
                    return [2 /*return*/, {
                            success: false,
                            data: null,
                            error: "아이디가 없습니다."
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.checkEmailVerifyFromId = checkEmailVerifyFromId;
//# sourceMappingURL=User.service.js.map