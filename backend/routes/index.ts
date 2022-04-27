const router = require('express').Router()
import user from './api/user';
import post from './api/post';
import comment from './api/comment';
import hashTag from './api/hashTag';
import report from './api/report';
import contract from './api/contract';


router.use('/user', user);
router.use('/post', post);
router.use('/comment', comment);
router.use('/hashTag', hashTag);
router.use('/report', report);
router.use('/contract', contract);



export default router;