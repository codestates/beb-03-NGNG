const router = require('express').Router()
import user from './api/user';
import post from './api/post';
import comment from './api/comment';


router.use('/user', user);
router.use('/post', post);
router.use('/comment', comment);



export default router;