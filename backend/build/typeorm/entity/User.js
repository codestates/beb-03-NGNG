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
exports.User = void 0;
var Thumb_1 = require("./Thumb");
var Comment_1 = require("./Comment");
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var Model_1 = require("./Models/Model");
var Post_1 = require("./Post");
var Report_1 = require("./Report");
var Reward_1 = require("./Reward");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.prototype.toJSON = function () {
        return __assign(__assign({}, this), { 
            // id: undefined,
            index: undefined, emailToken: undefined, isVerified: undefined });
    };
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        (0, class_validator_1.Length)(5, 30),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true,
            type: "text",
        }),
        __metadata("design:type", String)
    ], User.prototype, "imageUri", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        (0, class_validator_1.Length)(1, 255),
        (0, class_validator_1.IsEmail)(),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: ["user", "admin", "superadmin"],
            default: "user",
        }),
        (0, class_validator_1.IsEnum)(["user", "admin", "superadmin"]),
        __metadata("design:type", String)
    ], User.prototype, "role", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "text",
            nullable: true,
        }),
        __metadata("design:type", String)
    ], User.prototype, "emailToken", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "text",
        }),
        (0, class_validator_1.Length)(66, 66),
        __metadata("design:type", String)
    ], User.prototype, "privateKey", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], User.prototype, "isVerified", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Comment_1.Comment; }, function (comment) { return comment.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "comments", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (_) { return Report_1.Report; }, function (report) { return report.reporter; }),
        __metadata("design:type", Array)
    ], User.prototype, "reports", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Comment_1.Comment; }, function (comment) { return comment.user_id; }),
        __metadata("design:type", Array)
    ], User.prototype, "commentsForId", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Reward_1.Reward; }, function (reward) { return reward.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "rewardForId", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Post_1.Post; }, function (post) { return post.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "posts", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Thumb_1.Thumb; }, function (thumb) { return thumb.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "thumbs", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)()
    ], User);
    return User;
}(Model_1.Model));
exports.User = User;
//# sourceMappingURL=User.js.map