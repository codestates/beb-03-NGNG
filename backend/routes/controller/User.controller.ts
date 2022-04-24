import { Request, Response } from 'express';
import { createUser, getUserFromId, loginCheckUser, updateUser, verifyEmailUser, deleteUserFromId } from '../../service/User.service';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { sendMail } from '../../utilities/apiUtilities';
import { returnApi } from '../../types/service/Model/InterfaceReturnApiModel';
import { createWallet, mintToken, mintNFT } from './../../utilities/ether';

const register = async (req: Request, res: Response) => {
    const { id, email, password } = req.body;
    console.log("register : ", id, email, password)
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const emailToken = crypto.randomBytes(64).toString('hex');
    const privateKey = createWallet() as string;
    console.log("privateKey", privateKey);
    console.log(typeof privateKey)
    const result = await createUser({
        id,
        email,
        password: hashPassword,
        emailToken,
        isVerified: false,
        privateKey
    });

    if (result.success) {
        await sendMail({ email, emailToken,id, host: req.headers.host })
        mintToken(privateKey);
        mintNFT(privateKey);
        return res.status(201).json(result);
    }
    else {
        return res.status(500).json(result)
    }
}

const createToken = ({ id }: { id: string }) => {
    const secret: any = process.env.JWT_SECRET
    return jwt.sign({ id }, secret, { expiresIn: '1h' });
}


// const login = async (req: Request, res: Response) => {
//     const { id, password } = req.body;
//     const result = await loginCheckUser({ id, password });
//     if (result.success) {
//         const { user: { nickname } } = result.data;
//         const token = createToken({ id, nickname })
//         res.cookie('access-token', token, {
//             secure: true,
//             httpOnly: true,
//             maxAge: 3600000
//         })
//         // res.redirect('/dashboard')
//         return res.status(201).json(result);
//     }
//     else {
//         return res.status(500).json(result)
//     }
// }
const login = async (req: Request, res: Response) => {
    const { id, password } = req.body;
    const result = await loginCheckUser({ id, password });
    if (result.success) {
        const token = createToken({ id })
        return res.status(201).json({
            success: false,
            data: {
                token
            },
            error: null
        });
    }
    else {
        return res.status(500).json(result)
    }
}


const getLoadMyInfo = async (req: Request, res: Response) => {
    const { id } = req.user as { id: string }
    console.log("getLoadMyInfo", id);
    // const token = createToken(id)
    // res.cookie('access-token', token, {
    //     secure: true,
    //     httpOnly: true,
    //     maxAge: 3600000
    // })
    return res.status(201).json({
        success: true,
        data: { id },
        error: null
    });
}




const verifyEmail = async (req: Request, res: Response) => {
    const emailToken = req.query.token as string
    console.log(emailToken)
    const result = await verifyEmailUser({ emailToken })
    if (result.success) {
        return res.status(201).redirect("/");
    }
    else {
        return res.status(500).redirect("/");
    }
}



const sendVerifyEmail = async (req: Request, res: Response) => {
    const id = req.user.id as string;
    const email = req.body.email as string;
    const host = req.headers.host;
    const emailToken = crypto.randomBytes(64).toString('hex');
    const result = await updateUser({ id, email, emailToken })
    console.log("update User", result)
    if (result.success) {
        await sendMail({ host, email, emailToken, id });
        return res.status(201).json({
            success: true,
            message: "인증메일을 보냈습니다."
        })
    }
    else {
        return res.status(201).json({
            success: false,
            message: "인증 메일 보내기에 실패하였습니다."
        });
    }
}

const logout = async (req: Request, res: Response) => {
    res.cookie('access-token', "", { maxAge: 1 })
    res.status(201).json({ success: true })
}


const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.user as { id: string }
    const result = await getUserFromId({ id });
    if (result.success) {
        return res.status(201).json(result);
    }
    else {
        return res.status(500).json(result)
    }
}


const getUser = async (req: Request, res: Response) => {
    const { id } = req.user as { id: string }
    console.log(id)
    const result = await getUserFromId({ id });
    if (result.success) {
        return res.status(201).json(result);
    }
    else {
        return res.status(500).json(result)
    }
}

const withdrawal = async (req: Request, res: Response) => {
    const { id } = req.user as { id: string }
    const result = await deleteUserFromId(id);
    if (result.success) {
        return res.status(201).json(result);
    }
    else {
        return res.status(500).json(result)
    }
}



export { register, getUser, deleteUser, login, logout, verifyEmail, sendVerifyEmail, getLoadMyInfo, withdrawal }
