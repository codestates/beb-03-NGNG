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
exports.Transactions = void 0;
var typeorm_1 = require("typeorm");
var Transactions = /** @class */ (function (_super) {
    __extends(Transactions, _super);
    function Transactions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Transactions.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], Transactions.prototype, "hash", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", Number)
    ], Transactions.prototype, "nonce", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], Transactions.prototype, "blockHash", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", Number)
    ], Transactions.prototype, "blockNumber", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", Number)
    ], Transactions.prototype, "transactionIndex", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], Transactions.prototype, "from", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], Transactions.prototype, "to", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], Transactions.prototype, "value", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", Number)
    ], Transactions.prototype, "gas", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], Transactions.prototype, "gasPrice", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text" }),
        __metadata("design:type", String)
    ], Transactions.prototype, "input", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], Transactions.prototype, "v", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], Transactions.prototype, "r", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], Transactions.prototype, "s", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: false,
            type: "timestamp"
        }),
        __metadata("design:type", typeorm_1.Timestamp)
    ], Transactions.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: false,
            type: "timestamp"
        }),
        __metadata("design:type", typeorm_1.Timestamp)
    ], Transactions.prototype, "updatedAt", void 0);
    Transactions = __decorate([
        (0, typeorm_1.Entity)({ database: process.env.DATABASE_DEMON_NAME })
    ], Transactions);
    return Transactions;
}(typeorm_1.BaseEntity));
exports.Transactions = Transactions;
//# sourceMappingURL=Transactions.js.map