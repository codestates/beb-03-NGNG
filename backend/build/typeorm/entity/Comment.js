"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
var typeorm_1 = require("typeorm");
var Post_1 = require("./Post");
var User_1 = require("./User");
var Model_1 = require("./Models/Model");
var Comment = /** @class */ (function (_super) {
    __extends(Comment, _super);
    function Comment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Comment_1 = Comment;
    Comment.prototype.toJSON = function () {
        return __assign(__assign({}, this), { password: undefined });
    };
    var Comment_1;
    __decorate([
        (0, typeorm_1.Column)({
            nullable: false,
            type: "longtext",
        }),
        __metadata("design:type", String)
    ], Comment.prototype, "content", void 0);
    __decorate([
        (0, typeorm_1.Column)("boolean", {
            default: false,
        }),
        __metadata("design:type", Boolean)
    ], Comment.prototype, "deleted", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true,
        }),
        __metadata("design:type", String)
    ], Comment.prototype, "anonymouseId", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true,
        }),
        __metadata("design:type", String)
    ], Comment.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: false,
            default: false,
        }),
        __metadata("design:type", Boolean)
    ], Comment.prototype, "isMember", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (_) { return Comment_1; }, function (comment) { return comment.childComments; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }),
        __metadata("design:type", Comment)
    ], Comment.prototype, "parentComment", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (_) { return Comment_1; }, function (comment) { return comment.parentComment; }, {
            primary: true,
        }),
        __metadata("design:type", Array)
    ], Comment.prototype, "childComments", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.comments; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }),
        __metadata("design:type", User_1.User)
    ], Comment.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.commentsForId; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }),
        (0, typeorm_1.JoinColumn)({ name: "user_id", referencedColumnName: "id" }),
        __metadata("design:type", User_1.User)
    ], Comment.prototype, "user_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Post_1.Post; }, function (post) { return post.comments; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }),
        __metadata("design:type", Post_1.Post)
    ], Comment.prototype, "post", void 0);
    Comment = Comment_1 = __decorate([
        (0, typeorm_1.Entity)()
    ], Comment);
    return Comment;
}(Model_1.Model));
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map