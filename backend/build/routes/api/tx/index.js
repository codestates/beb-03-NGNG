"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Transaction_controller_1 = require("../../controller/Transaction.controller");
var middleware_1 = require("../../middleware");
var router = (0, express_1.Router)();
router.get('/getTransactions', middleware_1.loginRequired, Transaction_controller_1.getTransactions_controller);
exports.default = router;
//# sourceMappingURL=index.js.map