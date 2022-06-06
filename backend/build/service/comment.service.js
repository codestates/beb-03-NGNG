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
exports.getCommentsFromPostUuid = exports.deleteNonMemberCommentFromUuid = exports.deleteMemberCommentFromUuid = exports.createNonMemberComment = exports.createMemberComment = void 0;
var Comment_1 = require("./../typeorm/entity/Comment");
var User_1 = require("../typeorm/entity/User");
var Post_1 = require("../typeorm/entity/Post");
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var createMemberComment = function (commentData) { return __awaiter(void 0, void 0, void 0, function () {
    var content, postUuid, id, parentUuid, postFromUuid, userFromUuid, comment, commentFromUuid, errors, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                content = commentData.content, postUuid = commentData.postUuid, id = commentData.id, parentUuid = commentData.parentUuid;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                return [4 /*yield*/, Post_1.Post.findOneOrFail({ uuid: postUuid })];
            case 2:
                postFromUuid = _a.sent();
                return [4 /*yield*/, User_1.User.findOneOrFail({ id: id })];
            case 3:
                userFromUuid = _a.sent();
                comment = void 0;
                if (!(parentUuid !== undefined)) return [3 /*break*/, 5];
                return [4 /*yield*/, Comment_1.Comment.findOneOrFail({ uuid: parentUuid })];
            case 4:
                commentFromUuid = _a.sent();
                comment = Comment_1.Comment.create({
                    content: content,
                    post: postFromUuid,
                    user: userFromUuid,
                    user_id: userFromUuid,
                    isMember: true,
                    parentComment: commentFromUuid,
                });
                return [3 /*break*/, 6];
            case 5:
                comment = Comment_1.Comment.create({
                    content: content,
                    isMember: true,
                    post: postFromUuid,
                    user: userFromUuid,
                    user_id: userFromUuid,
                });
                _a.label = 6;
            case 6: return [4 /*yield*/, (0, class_validator_1.validate)(comment)];
            case 7:
                errors = _a.sent();
                if (errors.length > 0)
                    throw errors;
                return [4 /*yield*/, comment.save()];
            case 8:
                _a.sent();
                return [2 /*return*/, {
                        success: true,
                        data: null,
                        error: null,
                    }];
            case 9:
                err_1 = _a.sent();
                console.log("createMemberComment error check: ", err_1);
                return [2 /*return*/, {
                        success: false,
                        data: null,
                        error: "send comment error",
                    }];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.createMemberComment = createMemberComment;
var createNonMemberComment = function (commentData) { return __awaiter(void 0, void 0, void 0, function () {
    var content, postUuid, anonymouseId, password, parentUuid, postFromUuid, comment, commentFromUuid, errors, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                content = commentData.content, postUuid = commentData.postUuid, anonymouseId = commentData.anonymouseId, password = commentData.password, parentUuid = commentData.parentUuid;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                return [4 /*yield*/, Post_1.Post.findOneOrFail({ uuid: postUuid })];
            case 2:
                postFromUuid = _a.sent();
                comment = void 0;
                if (!(parentUuid !== undefined)) return [3 /*break*/, 4];
                return [4 /*yield*/, Comment_1.Comment.findOneOrFail({ uuid: parentUuid })];
            case 3:
                commentFromUuid = _a.sent();
                comment = Comment_1.Comment.create({
                    content: content,
                    post: postFromUuid,
                    anonymouseId: anonymouseId,
                    password: password,
                    parentComment: commentFromUuid,
                });
                return [3 /*break*/, 5];
            case 4:
                comment = Comment_1.Comment.create({
                    content: content,
                    post: postFromUuid,
                    anonymouseId: anonymouseId,
                    password: password,
                });
                _a.label = 5;
            case 5: return [4 /*yield*/, (0, class_validator_1.validate)(comment)];
            case 6:
                errors = _a.sent();
                if (errors.length > 0)
                    throw errors;
                return [4 /*yield*/, comment.save()];
            case 7:
                _a.sent();
                return [2 /*return*/, {
                        success: true,
                        data: null,
                        error: null,
                    }];
            case 8:
                err_2 = _a.sent();
                return [2 /*return*/, {
                        success: false,
                        data: null,
                        error: "createNonMemberComment error",
                    }];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.createNonMemberComment = createNonMemberComment;
var deleteMemberCommentFromUuid = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var id, commentUuid, UpdateResult, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = data.id, commentUuid = data.commentUuid;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, typeorm_1.getRepository)(Comment_1.Comment)
                        .createQueryBuilder("comment")
                        .update(Comment_1.Comment)
                        .set({
                        deleted: true,
                    })
                        .where("user_id = :id AND uuid = :commentUuid", { id: id, commentUuid: commentUuid })
                        .execute()];
            case 2:
                UpdateResult = _a.sent();
                // UpdateResult ex)
                // UpdateResult { generatedMaps: [], raw: [], affected: 1 }
                if (UpdateResult.affected) {
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
                            error: "업데이트 실패",
                        }];
                }
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                return [2 /*return*/, {
                        success: false,
                        data: null,
                        error: "createNonMemberComment server error",
                    }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteMemberCommentFromUuid = deleteMemberCommentFromUuid;
var deleteNonMemberCommentFromUuid = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var commentPassword, commentUuid, commentFromUuid, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                commentPassword = data.commentPassword, commentUuid = data.commentUuid;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Comment_1.Comment.findOneOrFail({
                        uuid: commentUuid,
                        password: commentPassword,
                    })];
            case 2:
                commentFromUuid = _a.sent();
                commentFromUuid.deleted = true;
                Comment_1.Comment.save(commentFromUuid);
                return [2 /*return*/, {
                        success: true,
                        data: null,
                        error: null,
                    }];
            case 3:
                err_4 = _a.sent();
                return [2 /*return*/, {
                        success: false,
                        data: null,
                        error: "createNonMemberComment error",
                    }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteNonMemberCommentFromUuid = deleteNonMemberCommentFromUuid;
var getCommentsFromPostUuid = function (_a) {
    var postUuid = _a.postUuid;
    return __awaiter(void 0, void 0, void 0, function () {
        var comment, temp_1, err_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, typeorm_1.getRepository)(Comment_1.Comment)
                            .createQueryBuilder("comment")
                            .leftJoinAndSelect("comment.user", "user")
                            .leftJoin("comment.post", "post")
                            .where("comment.parentComment IS NULL")
                            .andWhere("post.uuid = :uuid", { uuid: postUuid })
                            .leftJoinAndSelect("comment.childComments", " parentComment")
                            .orderBy("comment.createdAt", "ASC")
                            .getRawMany()];
                case 1:
                    comment = _b.sent();
                    temp_1 = {};
                    comment.map(function (o) {
                        // deleted가 1이라면 content 삭제
                        if (o.comment_deleted) {
                            o.comment_content = "삭제된 글 입니다.";
                        }
                        if (o.parentComment_deleted) {
                            o.parentComment_content = "삭제된 글 입니다.";
                        }
                        // temp에 index가 있다면
                        if (temp_1.hasOwnProperty(o.comment_index)) {
                            if (o.parentComment_index) {
                                temp_1[o.comment_index]["childComments"].push({
                                    uuid: o.parentComment_uuid,
                                    updatedAt: o.parentComment_updatedAt,
                                    content: o.parentComment_content,
                                    annonymouseId: o.parentComment_anonymouseId,
                                    isMember: o.parentComment_isMember,
                                    id: o.parentComment_user_id,
                                    deleted: o.parentComment_deleted,
                                });
                            }
                        }
                        // temp에 index가 없다면
                        else {
                            var childComments = [];
                            if (o.parentComment_index) {
                                childComments.push({
                                    uuid: o.parentComment_uuid,
                                    updatedAt: o.parentComment_updatedAt,
                                    content: o.parentComment_content,
                                    annonymouseId: o.parentComment_anonymouseId,
                                    isMember: o.parentComment_isMember,
                                    id: o.parentComment_user_id,
                                    deleted: o.parentComment_deleted,
                                });
                            }
                            temp_1[o.comment_index] = {
                                uuid: o.comment_uuid,
                                updatedAt: o.comment_updatedAt,
                                content: o.comment_content,
                                annonymouseId: o.comment_anonymouseId,
                                isMember: o.comment_isMember,
                                id: o.comment_user_id,
                                deleted: o.comment_deleted,
                                imageUri: o.user_imageUri,
                                childComments: childComments,
                            };
                        }
                    });
                    return [2 /*return*/, {
                            success: true,
                            data: {
                                comments: Object.values(temp_1),
                            },
                            error: null,
                        }];
                case 2:
                    err_5 = _b.sent();
                    return [2 /*return*/, {
                            success: false,
                            data: null,
                            error: "get Comments error",
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getCommentsFromPostUuid = getCommentsFromPostUuid;
//# sourceMappingURL=comment.service.js.map