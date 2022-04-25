const router = require('express').Router()
import user from './api/user';
import post from './api/post';
import comment from './api/comment';
import hashTag from './api/hashTag';


router.use('/user', user);
router.use('/post', post);
router.use('/comment', comment);
router.use('/hashTag', hashTag);



export default router;