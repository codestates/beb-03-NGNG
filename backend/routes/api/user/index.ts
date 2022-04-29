import express, { Router } from 'express';
import { register, getUser, login, logout, verifyEmail, sendVerifyEmail, getLoadMyInfo, withdrawal } from '../../controller/User.controller';
import { loginRequired, emailVerified, isNotEmailVerified, uploadImage } from '../../middleware'
const router = Router()
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

router.post('/register', uploadImage.single("image"), register);
router.get('/getUser', loginRequired, getUser);
router.get('/withdrawal', loginRequired, withdrawal);
router.post('/login', login);
router.post('/logout', loginRequired, logout);
router.post('/sendVerifyEmail', loginRequired, isNotEmailVerified, sendVerifyEmail);
router.get('/verify-email', verifyEmail);
router.get('/loadMyInfo', loginRequired, getLoadMyInfo);

export default router