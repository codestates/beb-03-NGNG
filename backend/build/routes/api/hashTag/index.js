"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var HashTag_controller_1 = require("../../controller/HashTag.controller");
var router = (0, express_1.Router)();
// 카테고리 추가해야함
router.get('/topHashtag', HashTag_controller_1.getTopHashTag);
exports.default = router;
//# sourceMappingURL=index.js.map