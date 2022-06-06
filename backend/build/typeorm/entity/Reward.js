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
exports.Reward = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var Model_1 = require("./Models/Model");
var User_1 = require("./User");
var Reward = /** @class */ (function (_super) {
    __extends(Reward, _super);
    function Reward() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.Column)({
            nullable: false,
            type: 'enum',
            enum: ['post', 'comment', 'likeIt'],
        }),
        (0, class_validator_1.IsEnum)(['post', 'comment', 'likeIt']),
        __metadata("design:type", String)
    ], Reward.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.rewardForId; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }),
        __metadata("design:type", User_1.User)
    ], Reward.prototype, "user", void 0);
    Reward = __decorate([
        (0, typeorm_1.Entity)()
    ], Reward);
    return Reward;
}(Model_1.Model));
exports.Reward = Reward;
//# sourceMappingURL=Reward.js.map