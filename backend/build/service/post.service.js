"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.getHashTagPosts_service = exports.getLikeItPost = exports.likeItPost = exports.getPostsSortByTime = exports.getPostFromUuid = exports.updatePost_service = exports.deletePost_service = exports.createPost = void 0;
var HashTag_1 = require("./../typeorm/entity/HashTag");
var typeorm_1 = require("typeorm");
var Thumb_1 = require("../typeorm/entity/Thumb");
var User_1 = require("../typeorm/entity/User");
var class_validator_1 = require("class-validator");
var Post_1 = require("../typeorm/entity/Post");
var uuid_1 = require("uuid");
var likeItPost = function (likeItData) { return __awaiter(void 0, void 0, void 0, function () {
    var postUuid, id, post, user, thumbFindOne, thumb, errors, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                postUuid = likeItData.postUuid, id = likeItData.id;
                return [4 /*yield*/, Post_1.Post.findOneOrFail({ uuid: postUuid })];
            case 1:
                post = _a.sent();
                return [4 /*yield*/, User_1.User.findOneOrFail({ id: id })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, Thumb_1.Thumb.findOne({ post: post, user: user })];
            case 3:
                thumbFindOne = _a.sent();
                if (process.env.NODE_ENV !== "production")
                    console.log(thumbFindOne);
                if (!thumbFindOne) return [3 /*break*/, 4];
                // thumbFindOne.remove()
                return [2 /*return*/, {
                        success: false,
                        data: null,
                        error: "이미 좋아요를 눌렀습니다.",
                    }];
            case 4:
                thumb = Thumb_1.Thumb.create({
                    post: post,
                    user: user,
                    likeIt: true,
                });
                return [4 /*yield*/, (0, class_validator_1.validate)(thumb)];
            case 5:
                errors = _a.sent();
                if (errors.length > 0)
                    throw errors;
                return [4 /*yield*/, thumb.save()];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/, {
                    success: true,
                    data: null,
                    error: null,
                }];
            case 8:
                err_1 = _a.sent();
                return [2 /*return*/, {
                        success: false,
                        data: null,
                        error: "좋아요 실패",
                    }];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.likeItPost = likeItPost;
var getLikeItPost = function (likeItData) { return __awaiter(void 0, void 0, void 0, function () {
    var postUuid, post, thumb, likeItCount, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                postUuid = likeItData.postUuid;
                return [4 /*yield*/, Post_1.Post.findOneOrFail({ uuid: postUuid })];
            case 1:
                post = _a.sent();
                return [4 /*yield*/, (0, typeorm_1.getRepository)(Thumb_1.Thumb)
                        .createQueryBuilder("thumb")
                        .select("SUM(thumb.likeIt)", "likeItCount")
                        .where("thumb.postIndex = :postIndex", { postIndex: post.index })
                        .getRawOne()];
            case 2:
                thumb = _a.sent();
                if (process.env.NODE_ENV !== "production")
                    console.log(thumb);
                likeItCount = 0;
                if (thumb.sum !== null) {
                    likeItCount = parseInt(thumb.likeItCount);
                }
                return [2 /*return*/, {
                        success: true,
                        data: {
                            likeItCount: likeItCount,
                        },
                        error: null,
                    }];
            case 3:
                err_2 = _a.sent();
                return [2 /*return*/, {
                        success: false,
                        data: null,
                        error: "좋아요 가져오기 실패",
                    }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getLikeItPost = getLikeItPost;
var createPost = function (postData) { return __awaiter(void 0, void 0, void 0, function () {
    var content, id, tags, imageUri, user, post_1, errors, tagArray, hashTag, errors2, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                content = postData.content, id = postData.id, tags = postData.tags, imageUri = postData.imageUri;
                if (process.env.NODE_ENV !== "production")
                    console.log(postData);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, User_1.User.findOneOrFail({ id: id })];
            case 2:
                user = _a.sent();
                post_1 = Post_1.Post.create({ content: content, user: user, imageUri: imageUri });
                return [4 /*yield*/, (0, class_validator_1.validate)(post_1)];
            case 3:
                errors = _a.sent();
                if (errors.length > 0)
                    throw errors;
                return [4 /*yield*/, post_1.save()];
            case 4:
                _a.sent();
                if (process.env.NODE_ENV !== "production")
                    console.log(post_1);
                tagArray = tags.map(function (tag) {
                    return { post: post_1, tag: tag, uuid: (0, uuid_1.v4)() };
                });
                if (process.env.NODE_ENV !== "production")
                    console.log(tagArray);
                return [4 /*yield*/, (0, typeorm_1.getConnection)()
                        .createQueryBuilder()
                        .insert()
                        .into(HashTag_1.HashTag)
                        .values(tagArray)
                        .execute()];
            case 5:
                hashTag = _a.sent();
                return [4 /*yield*/, (0, class_validator_1.validate)(hashTag)];
            case 6:
                errors2 = _a.sent();
                if (errors2.length > 0)
                    throw errors2;
                return [2 /*return*/, {
                        success: true,
                        data: {
                            postUuid: post_1.uuid,
                        },
                        error: null,
                    }];
            case 7:
                err_3 = _a.sent();
                if (process.env.NODE_ENV !== "production") {
                    console.error(err_3);
                }
                return [2 /*return*/, {
                        success: false,
                        data: null,
                        error: "포스트 생성 실패",
                    }];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
var deletePost_service = function (_a) {
    var postUuid = _a.postUuid, id = _a.id;
    return __awaiter(void 0, void 0, void 0, function () {
        var result, err_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, typeorm_1.getConnection)().transaction(function (manager) { return __awaiter(void 0, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, manager.query("\n                DELETE a FROM post as a LEFT JOIN user as b \n                ON a.userIndex = b.index  \n                WHERE a.uuid = '" + postUuid + "' AND b.id = '" + id + "'")];
                                    case 1:
                                        result = _a.sent();
                                        return [2 /*return*/, result];
                                }
                            });
                        }); })];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, {
                            success: true,
                            data: { result: result },
                            error: null,
                        }];
                case 2:
                    err_4 = _b.sent();
                    if (process.env.NODE_ENV !== "production") {
                        console.error(err_4);
                    }
                    return [2 /*return*/, {
                            success: false,
                            data: null,
                            error: "post 삭제 실패",
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.deletePost_service = deletePost_service;
var updatePost_service = function (_a) {
    var postUuid = _a.postUuid, id = _a.id, content = _a.content;
    return __awaiter(void 0, void 0, void 0, function () {
        var result, err_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, typeorm_1.getConnection)().transaction(function (manager) { return __awaiter(void 0, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, manager.query("\n                UPDATE post LEFT JOIN user\n                ON post.userIndex = user.index  \n                SET post.content = '" + content + "'\n                WHERE post.uuid = '" + postUuid + "' AND user.id = '" + id + "'\n                ")];
                                    case 1:
                                        result = _a.sent();
                                        return [2 /*return*/, result];
                                }
                            });
                        }); })];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, {
                            success: true,
                            data: { result: result },
                            error: "post 수정 성공",
                        }];
                case 2:
                    err_5 = _b.sent();
                    if (process.env.NODE_ENV !== "production") {
                        console.error(err_5);
                    }
                    return [2 /*return*/, {
                            success: false,
                            data: null,
                            error: "post 수정 실패",
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.updatePost_service = updatePost_service;
var getPostFromUuid = function (_a) {
    var postUuid = _a.postUuid;
    return __awaiter(void 0, void 0, void 0, function () {
        var post, tags, err_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, typeorm_1.getRepository)(Post_1.Post)
                            .createQueryBuilder("post")
                            .leftJoin("post.user", "user")
                            .addSelect(["user.id", "user.imageUri"])
                            .where("post.uuid = :uuid", { uuid: postUuid })
                            .getOne()];
                case 1:
                    post = _b.sent();
                    if (!post)
                        throw "post를 찾을 수 없음";
                    return [4 /*yield*/, (0, typeorm_1.getRepository)(HashTag_1.HashTag)
                            .createQueryBuilder("hash_tag")
                            .select()
                            .where("hash_tag.postIndex = :postIdx", { postIdx: post["index"] })
                            .getMany()];
                case 2:
                    tags = _b.sent();
                    if (process.env.NODE_ENV !== "production")
                        console.log(post);
                    return [2 /*return*/, {
                            success: true,
                            data: {
                                post: __assign(__assign({}, post), { tag: tags.map(function (_a) {
                                        var tag = _a.tag;
                                        return tag;
                                    }) }),
                            },
                            error: null,
                        }];
                case 3:
                    err_6 = _b.sent();
                    if (process.env.NODE_ENV !== "production") {
                        console.error(err_6);
                    }
                    return [2 /*return*/, {
                            success: false,
                            data: null,
                            error: "포스트 가져오기 실패",
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.getPostFromUuid = getPostFromUuid;
var getPostsSortByTime = function (_a) {
    var _b = _a.limit, limit = _b === void 0 ? "150" : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var intLimit, posts, err_7;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    intLimit = parseInt(limit);
                    return [4 /*yield*/, (0, typeorm_1.getRepository)(Post_1.Post)
                            .createQueryBuilder("post")
                            .select(["post.uuid", "post.updatedAt", "post.createdAt", "post.content"])
                            .leftJoin("post.user", "user")
                            .addSelect("user.id")
                            .orderBy("post.createdAt", "DESC")
                            .limit(intLimit)
                            .getRawMany()];
                case 1:
                    posts = _c.sent();
                    if (process.env.NODE_ENV !== "production")
                        console.log(posts);
                    return [2 /*return*/, {
                            success: true,
                            data: {
                                posts: posts,
                            },
                            error: null,
                        }];
                case 2:
                    err_7 = _c.sent();
                    console.error(err_7);
                    return [2 /*return*/, {
                            success: false,
                            data: null,
                            error: "포스트 여러개 가져오기 실패",
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getPostsSortByTime = getPostsSortByTime;
var getHashTagPosts_service = function (_a) {
    var tag = _a.tag;
    return __awaiter(void 0, void 0, void 0, function () {
        var hashTag, err_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (process.env.NODE_ENV !== "production")
                        console.log(tag);
                    return [4 /*yield*/, (0, typeorm_1.getRepository)(HashTag_1.HashTag)
                            .createQueryBuilder("hash_tag")
                            .leftJoin("hash_tag.post", "post")
                            .where("hash_tag.tag = :tag", { tag: tag })
                            .leftJoin("post.user", "user")
                            .select(["post.uuid", "post.updatedAt", "post.content", "id"])
                            .getRawMany()];
                case 1:
                    hashTag = _b.sent();
                    if (process.env.NODE_ENV !== "production")
                        console.log(hashTag);
                    return [2 /*return*/, {
                            success: true,
                            data: {
                                hashTag: hashTag,
                            },
                            error: null,
                        }];
                case 2:
                    err_8 = _b.sent();
                    console.error(err_8);
                    return [2 /*return*/, {
                            success: false,
                            data: null,
                            error: "포스트 여러개 가져오기 실패",
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getHashTagPosts_service = getHashTagPosts_service;
//# sourceMappingURL=post.service.js.map