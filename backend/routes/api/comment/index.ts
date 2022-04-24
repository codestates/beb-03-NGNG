import { Router } from 'express';
import { loginRequired, emailVerified, ipMiddleware } from '../../middleware';
import {
    sendMemberComment,
    sendNonMemberComment,
    deleteMemberComment,
    deleteNonMemberComment,
    updateMemberComment,
    updateNonMemberComment,
    getComments
} from '../../controller/Comment.controller';
const router = Router()

router.post('/sendMemberComment',
    loginRequired,
    ipMiddleware,
    sendMemberComment
);
router.post('/deleteMemberComment',
    loginRequired,
    deleteMemberComment
);
// router.post('/updateMemberComment',
//     loginRequired,
//     emailVerified,
//     updateMemberComment
// );


router.post('/sendNonMemberComment',
    ipMiddleware,
    sendNonMemberComment
);
router.post('/deleteNonmemberComment',
    deleteNonMemberComment
);
// router.post('/updateNonMemberComment',
//     updateNonMemberComment
// );

router.get('/getComments', getComments);

// router.put('/updatePost', likeIt);
// router.get('/deletePost', getLikeIt);
export default router