"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var router = require("express").Router();
var user_1 = __importDefault(require("./api/user"));
var post_1 = __importDefault(require("./api/post"));
var comment_1 = __importDefault(require("./api/comment"));
var hashTag_1 = __importDefault(require("./api/hashTag"));
var report_1 = __importDefault(require("./api/report"));
var contract_1 = __importDefault(require("./api/contract"));
var admin_1 = __importDefault(require("./api/admin"));
var tx_1 = __importDefault(require("./api/tx"));
router.use("/user", user_1.default);
router.use("/post", post_1.default);
router.use("/comment", comment_1.default);
router.use("/hashTag", hashTag_1.default);
router.use("/report", report_1.default);
router.use("/contract", contract_1.default);
router.use("/admin", admin_1.default);
router.use("/tx", tx_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map