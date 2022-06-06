"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Report_controller_1 = require("../../controller/Report.controller");
var middleware_1 = require("../../middleware");
var router = (0, express_1.Router)();
router.post('/reportPost', middleware_1.loginRequired, Report_controller_1.reportPost_controller);
exports.default = router;
//# sourceMappingURL=index.js.map