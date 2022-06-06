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
exports.pay_service = exports.addLikeItReward_service = exports.addReward_service = void 0;
var ethers_1 = require("ethers");
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var Post_1 = require("../typeorm/entity/Post");
var Reward_1 = require("../typeorm/entity/Reward");
var User_1 = require("../typeorm/entity/User");
var ether_1 = require("../utilities/ether");
var addReward_service = function (_a) {
    var type = _a.type, id = _a.id;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, reward, errors, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, User_1.User.findOneOrFail({ id: id })];
                case 1:
                    user = _b.sent();
                    reward = Reward_1.Reward.create({ user: user, type: type });
                    return [4 /*yield*/, (0, class_validator_1.validate)(reward)];
                case 2:
                    errors = _b.sent();
                    if (errors.length > 0)
                        throw errors;
                    return [4 /*yield*/, reward.save()];
                case 3:
                    _b.sent();
                    return [2 /*return*/, {
                            success: true,
                            data: null,
                            error: null,
                        }];
                case 4:
                    err_1 = _b.sent();
                    console.log("createUser error check : ", err_1);
                    return [2 /*return*/, {
                            success: false,
                            data: null,
                            error: "send comment error"
                        }];
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.addReward_service = addReward_service;
// privateKey user
var addLikeItReward_service = function (_a) {
    var postUuid = _a.postUuid;
    return __awaiter(void 0, void 0, void 0, function () {
        var type, post, reward, errors, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    type = 'likeIt';
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, (0, typeorm_1.getRepository)(Post_1.Post)
                            .createQueryBuilder('post')
                            .leftJoinAndSelect("post.user", "user")
                            .where("post.uuid = :postUuid", { postUuid: postUuid })
                            .getOne()];
                case 2:
                    post = _b.sent();
                    if (process.env.NODE_ENV !== "production")
                        console.log(post);
                    reward = Reward_1.Reward.create({ user: post === null || post === void 0 ? void 0 : post.user, type: type });
                    return [4 /*yield*/, (0, class_validator_1.validate)(reward)];
                case 3:
                    errors = _b.sent();
                    if (errors.length > 0)
                        throw errors;
                    return [4 /*yield*/, reward.save()];
                case 4:
                    _b.sent();
                    return [2 /*return*/, {
                            success: true,
                            data: null,
                            error: null,
                        }];
                case 5:
                    err_2 = _b.sent();
                    console.log("addLikeItReward_service error check : ", err_2);
                    return [2 /*return*/, {
                            success: false,
                            data: null,
                            error: "send comment error"
                        }];
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.addLikeItReward_service = addLikeItReward_service;
var pay_service = function (_a) {
    var role = _a.role;
    return __awaiter(void 0, void 0, void 0, function () {
        var rewards, _i, rewards_1, reward, type, privateKey, amount, result, NftBalance, err_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, , 9]);
                    if (role === "user")
                        throw "권한이 없습니다.";
                    return [4 /*yield*/, (0, typeorm_1.getRepository)(Reward_1.Reward)
                            .createQueryBuilder("reward")
                            .leftJoinAndSelect('reward.user', 'user')
                            .getRawMany()];
                case 1:
                    rewards = _b.sent();
                    return [4 /*yield*/, (0, typeorm_1.getRepository)(Reward_1.Reward)
                            .createQueryBuilder()
                            .delete()
                            .execute()];
                case 2:
                    _b.sent();
                    if (process.env.NODE_ENV !== "production")
                        console.log(rewards);
                    _i = 0, rewards_1 = rewards;
                    _b.label = 3;
                case 3:
                    if (!(_i < rewards_1.length)) return [3 /*break*/, 7];
                    reward = rewards_1[_i];
                    type = reward["reward_type"];
                    privateKey = reward['user_privateKey'];
                    amount = 0;
                    if (type === 'post') {
                        amount = 10;
                    }
                    else if (type === 'comment') {
                        amount = 5;
                    }
                    else if (type === 'like') {
                        amount = 1;
                    }
                    return [4 /*yield*/, (0, ether_1.findNFT)({ privateKey: privateKey })];
                case 4:
                    result = _b.sent();
                    if (process.env.NODE_ENV !== "production")
                        console.log('nft balance', result);
                    NftBalance = +ethers_1.ethers.utils.formatEther(result);
                    return [4 /*yield*/, (0, ether_1.mintToken)(privateKey, (amount * (NftBalance + 1)).toString())];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 3];
                case 7: return [2 /*return*/, {
                        success: true,
                        data: {
                            rewards: rewards.map(function (_a) {
                                var reward_type = _a.reward_type, user_id = _a.user_id;
                                return { reward_type: reward_type, user_id: user_id };
                            })
                        },
                        error: null,
                    }];
                case 8:
                    err_3 = _b.sent();
                    console.log("pay_service error : ", err_3);
                    return [2 /*return*/, {
                            success: false,
                            data: null,
                            error: err_3,
                        }];
                case 9: return [2 /*return*/];
            }
        });
    });
};
exports.pay_service = pay_service;
//# sourceMappingURL=reward.service.js.map