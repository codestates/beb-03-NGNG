"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var express_1 = __importDefault(require("../config/express"));
var http = (0, supertest_1.default)(express_1.default);
exports.default = http;
//# sourceMappingURL=supertest.js.map