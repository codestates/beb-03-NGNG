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
exports.Post = void 0;
var Thumb_1 = require("./Thumb");
var typeorm_1 = require("typeorm");
var Comment_1 = require("./Comment");
var Model_1 = require("./Models/Model");
var User_1 = require("./User");
var HashTag_1 = require("./HashTag");
var Report_1 = require("./Report");
var Post = /** @class */ (function (_super) {
    __extends(Post, _super);
    function Post() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Post.prototype.toJSON = function () {
        return __assign({}, this);
    };
    __decorate([
        (0, typeorm_1.Column)({ type: "text" }),
        __metadata("design:type", String)
    ], Post.prototype, "content", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: ["user", "admin", "superadmin"],
            default: "user",
        }),
        __metadata("design:type", String)
    ], Post.prototype, "permision", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: false,
            default: 0,
        }),
        __metadata("design:type", Boolean)
    ], Post.prototype, "delete", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true,
            type: "text",
        }),
        __metadata("design:type", String)
    ], Post.prototype, "imageUri", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: false,
            default: true,
        }),
        __metadata("design:type", Boolean)
    ], Post.prototype, "useComment", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: false,
            default: 0,
        }),
        __metadata("design:type", Number)
    ], Post.prototype, "commentCount", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (post) { return post.posts; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }),
        __metadata("design:type", User_1.User)
    ], Post.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (_) { return HashTag_1.HashTag; }, function (hashTag) { return hashTag.post; }),
        __metadata("design:type", Array)
    ], Post.prototype, "hashTags", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (_) { return Report_1.Report; }, function (report) { return report.post; }),
        __metadata("design:type", Array)
    ], Post.prototype, "reports", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (_) { return Comment_1.Comment; }, function (comment) { return comment.post; }),
        __metadata("design:type", Array)
    ], Post.prototype, "comments", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (_) { return Thumb_1.Thumb; }, function (thumb) { return thumb.post; }),
        __metadata("design:type", Array)
    ], Post.prototype, "thumbs", void 0);
    Post = __decorate([
        (0, typeorm_1.Entity)()
    ], Post);
    return Post;
}(Model_1.Model));
exports.Post = Post;
//# sourceMappingURL=Post.js.map