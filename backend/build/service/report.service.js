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
exports.reportPost_service = void 0;
var class_validator_1 = require("class-validator");
var Post_1 = require("../typeorm/entity/Post");
var Report_1 = require("../typeorm/entity/Report");
var User_1 = require("../typeorm/entity/User");
var reportPost_service = function (_a) {
    var id = _a.id, postUuid = _a.postUuid, content = _a.content;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, post, report, errors, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, User_1.User.findOneOrFail({ id: id })];
                case 1:
                    user = _b.sent();
                    return [4 /*yield*/, Post_1.Post.findOneOrFail({ uuid: postUuid })];
                case 2:
                    post = _b.sent();
                    if (!(user && post)) return [3 /*break*/, 5];
                    report = Report_1.Report.create({
                        reporter: user,
                        content: content,
                        post: post
                    });
                    return [4 /*yield*/, (0, class_validator_1.validate)(report)];
                case 3:
                    errors = _b.sent();
                    if (errors.length > 0)
                        throw errors;
                    return [4 /*yield*/, report.save()];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5: return [2 /*return*/, {
                        success: true,
                        data: null,
                        error: null,
                    }];
                case 6:
                    err_1 = _b.sent();
                    console.log("reportPost_service error check : ", err_1);
                    return [2 /*return*/, {
                            success: false,
                            data: null,
                            error: "send comment error"
                        }];
                case 7: return [2 /*return*/];
            }
        });
    });
};
exports.reportPost_service = reportPost_service;
//# sourceMappingURL=report.service.js.map