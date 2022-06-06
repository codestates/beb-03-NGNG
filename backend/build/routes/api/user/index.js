"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_controller_1 = require("../../controller/User.controller");
var middleware_1 = require("../../middleware");
var router = (0, express_1.Router)();
/**
 * @swagger
 * paths:
 *  /api/user/register:
 *    get:
 *      summary: "회원가입"
 *      description: "post 방식으로 id, nickname, email, password 4개의 데이터를 받음."
 *      tags: [user]
 *      responses:
 *        "201":
 *          description: 회원가입
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                            { "id": 1, "name": "유저1" },
 *                            { "id": 2, "name": "유저2" },
 *                            { "id": 3, "name": "유저3" },
 *                          ]
 */
router.post('/register', middleware_1.uploadImage.single("image"), User_controller_1.register);
router.get('/getUser', middleware_1.loginRequired, User_controller_1.getUser);
router.get('/withdrawal', middleware_1.loginRequired, User_controller_1.withdrawal);
router.post('/login', User_controller_1.login);
router.post('/logout', middleware_1.loginRequired, User_controller_1.logout);
router.post('/sendVerifyEmail', middleware_1.loginRequired, middleware_1.isNotEmailVerified, User_controller_1.sendVerifyEmail);
router.get('/verify-email', User_controller_1.verifyEmail);
router.get('/loadMyInfo', middleware_1.loginRequired, User_controller_1.getLoadMyInfo);
exports.default = router;
//# sourceMappingURL=index.js.map