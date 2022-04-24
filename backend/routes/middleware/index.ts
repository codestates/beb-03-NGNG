import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { checkEmailVerifyFromId } from '../../service/User.service';
import requestIp from 'request-ip';


const loginRequired = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const token = req?.cookies['access-token'];
        let token = null;

        const bearerHeader = req?.headers['authorization'];
        console.log(bearerHeader)
        if (typeof bearerHeader !== undefined) {
            const bearer = bearerHeader.split(' ');
            if (bearer.length === 2) {
                token = bearer[1];
            }
        }

        const secret: any = process.env.JWT_SECRET
        if (token) {
            const validateToken: any = jwt.verify(token, secret);
            console.log("validateToken : ", validateToken);

            // jwt 복호화해서 나온 id 나 nickname 기준으로 
            // db에서 확인해서 db 데이터를 넣어주느냐
            // 그대로 복호환 된 값을 넣어주느냐
            
            if (validateToken) {
                req.user = {
                    id: validateToken.id,
                    nickname: validateToken.nickname
                }
                next()
            }
            else {
                console.log("token expires");
                // res.redirect('/')
                res.status(500).json({ success: false, message: "token expires" })
            }

        }
        else {
            console.log('token not found')
            // res.redirect('/')
            res.status(500).json({ success: false, message: "token not found" })

        }
    }
    catch (err) {
        // console.log(err)
        res.cookie('access-token', "", { maxAge: 1 })
        // res.redirect('/')
    }
}

const emailVerified = async (req: Request, res: any, next: NextFunction) => {
    const id = req.body.id as string;
    console.log(id)
    const result = await checkEmailVerifyFromId({ id });
    if (result.success) {
        next()
    }
    else {
        console.log(result.error)
        return res.status(500).json(result)
    }
}

const isNotEmailVerified = async (req: Request, res: any, next: NextFunction) => {
    const id = req.body.id as string;
    console.log(id)
    const result = await checkEmailVerifyFromId({ id });
    if (result.success) {
        result.error = "이미 이메일 인증을 받았습니다."
        console.log(result.error)
        return res.status(500).json(result).redirect('/emailVerify')
    }
    else {
        next()
    }
}

const ipMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const clientIp = requestIp.getClientIp(req);

    if (req.user === undefined) {
        req.user = {}
    }
    req.user.ipAddress = clientIp as string;
    next();
};

export { loginRequired, emailVerified, isNotEmailVerified, ipMiddleware }