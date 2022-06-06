"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var middleware_1 = require("../../middleware");
var Admin_controller_1 = require("../../controller/Admin.controller");
var router = (0, express_1.Router)();
router.get('/pay', middleware_1.loginRequired, Admin_controller_1.pay);
exports.default = router;
//# sourceMappingURL=index.js.map