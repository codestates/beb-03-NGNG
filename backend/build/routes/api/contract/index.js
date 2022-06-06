"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var middleware_1 = require("../../middleware");
var Contract_controller_1 = require("../../controller/Contract.controller");
var router = (0, express_1.Router)();
router.post("/mintNFT", middleware_1.loginRequired, Contract_controller_1.mintNFT_controller);
router.post("/transferToken", middleware_1.loginRequired, Contract_controller_1.transferToken_controller);
exports.default = router;
//# sourceMappingURL=index.js.map