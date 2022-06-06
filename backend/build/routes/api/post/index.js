"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Post_controller_1 = require("../../controller/Post.controller");
var middleware_1 = require("../../middleware");
var router = (0, express_1.Router)();
// 카테고리 추가해야함
router.post('/sendPost', middleware_1.loginRequired, middleware_1.uploadImage.single('image'), Post_controller_1.sendPost);
router.get('/getPost', Post_controller_1.getPost);
router.get('/getPosts', Post_controller_1.getPosts);
router.get('/getHashTagPosts', Post_controller_1.getHashTagPosts);
router.put('/likeIt', middleware_1.loginRequired, Post_controller_1.likeIt);
router.get('/getLikeIt', Post_controller_1.getLikeIt);
router.put('/updatePost', middleware_1.loginRequired, Post_controller_1.updatePost);
router.delete('/deletePost', middleware_1.loginRequired, Post_controller_1.deletePost);
exports.default = router;
//# sourceMappingURL=index.js.map