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
exports.getHashTagPosts = exports.updatePost = exports.deletePost = exports.getLikeIt = exports.likeIt = exports.getPosts = exports.getPost = exports.sendPost = void 0;
var post_service_1 = require("../../service/post.service");
var ipfs_http_client_1 = require("ipfs-http-client");
var reward_service_1 = require("../../service/reward.service");
var sendPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, content, tagsString, buffer, client, imageUri, cid, tags, result, err_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                id = req.user.id;
                _a = req.body, content = _a.content, tagsString = _a.tags;
                buffer = (_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.buffer;
                client = (0, ipfs_http_client_1.create)("https://ipfs.infura.io:5001/api/v0");
                imageUri = undefined;
                if (!buffer) return [3 /*break*/, 2];
                return [4 /*yield*/, client.add(buffer)];
            case 1:
                cid = _c.sent();
                imageUri = "https://ipfs.io/ipfs/" + cid.path;
                _c.label = 2;
            case 2:
                tags = tagsString.split(/(#[^#\s]+)/g).filter(function (v) {
                    return v.match(/(#[^#\s]+)/g);
                }).map(function (tag) { return tag.slice(1); });
                if (process.env.NODE_ENV !== "production")
                    console.log(tags);
                return [4 /*yield*/, (0, post_service_1.createPost)({
                        content: content,
                        id: id,
                        tags: tags,
                        imageUri: imageUri
                    })];
            case 3:
                result = _c.sent();
                if (result.success) {
                    (0, reward_service_1.addReward_service)({ type: "post", id: id });
                    return [2 /*return*/, res.status(201).json(result)];
                }
                else {
                    return [2 /*return*/, res.status(400).json(result)];
                }
                return [3 /*break*/, 5];
            case 4:
                err_1 = _c.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        data: null,
                        error: err_1,
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.sendPost = sendPost;
var getPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postUuid, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                postUuid = req.query.postUuid;
                return [4 /*yield*/, (0, post_service_1.getPostFromUuid)({
                        postUuid: postUuid
                    })];
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
                err_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        data: null,
                        error: err_2,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPost = getPost;
var getPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var limit, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                limit = req.query.limit;
                return [4 /*yield*/, (0, post_service_1.getPostsSortByTime)({ limit: limit })];
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
exports.getPosts = getPosts;
var getHashTagPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tag, result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                tag = req.query.tag;
                if (process.env.NODE_ENV !== "production")
                    console.log(tag);
                return [4 /*yield*/, (0, post_service_1.getHashTagPosts_service)({ tag: tag })];
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
                err_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        data: null,
                        error: err_4,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getHashTagPosts = getHashTagPosts;
var likeIt = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postUuid, id, result, err_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                postUuid = req.body.postUuid;
                id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
                return [4 /*yield*/, (0, post_service_1.likeItPost)({
                        postUuid: postUuid,
                        id: id,
                    })];
            case 1:
                result = _b.sent();
                if (result.success) {
                    (0, reward_service_1.addLikeItReward_service)({ postUuid: postUuid });
                    return [2 /*return*/, res.status(201).json(result)];
                }
                else {
                    return [2 /*return*/, res.status(500).json(result)];
                }
                return [3 /*break*/, 3];
            case 2:
                err_5 = _b.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        data: null,
                        error: err_5,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.likeIt = likeIt;
var getLikeIt = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postUuid, result, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                postUuid = req.query.postUuid;
                return [4 /*yield*/, (0, post_service_1.getLikeItPost)({
                        postUuid: postUuid
                    })];
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
exports.getLikeIt = getLikeIt;
var deletePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postUuid, id, result, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                postUuid = req.query.postUuid;
                id = req.user.id;
                return [4 /*yield*/, (0, post_service_1.deletePost_service)({
                        id: id,
                        postUuid: postUuid
                    })];
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
                err_7 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        data: null,
                        error: err_7,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deletePost = deletePost;
var updatePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postUuid, content, id, result, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                postUuid = req.body.postUuid;
                content = req.body.content;
                id = req.user.id;
                return [4 /*yield*/, (0, post_service_1.updatePost_service)({
                        id: id,
                        postUuid: postUuid,
                        content: content,
                    })];
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
                err_8 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        success: false,
                        data: null,
                        error: err_8,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updatePost = updatePost;
//# sourceMappingURL=Post.controller.js.map