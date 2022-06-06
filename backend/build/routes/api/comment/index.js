"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var middleware_1 = require("../../middleware");
var Comment_controller_1 = require("../../controller/Comment.controller");
var router = (0, express_1.Router)();
router.post('/sendMemberComment', middleware_1.loginRequired, Comment_controller_1.sendMemberComment);
router.post('/deleteMemberComment', middleware_1.loginRequired, Comment_controller_1.deleteMemberComment);
// router.post('/updateMemberComment',
//     loginRequired,
//     emailVerified,
//     updateMemberComment
// );
router.post('/sendNonMemberComment', Comment_controller_1.sendNonMemberComment);
router.post('/deleteNonmemberComment', Comment_controller_1.deleteNonMemberComment);
// router.post('/updateNonMemberComment',
//     updateNonMemberComment
// );
router.get('/getComments', Comment_controller_1.getComments);
// router.put('/updatePost', likeIt);
// router.get('/deletePost', getLikeIt);
exports.default = router;
//# sourceMappingURL=index.js.map