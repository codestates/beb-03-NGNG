import { validate } from 'class-validator';
import { ILoginUser, IReadUser, IUser, returnUser } from '../types/service/InterfaceUser';
import { User } from '../typeorm/entity/User';
import bcrypt from 'bcrypt';
import { sanitizeUser } from '../utilities/apiUtilities';
import { returnApi } from '../types/service/Model/InterfaceReturnApiModel';


const createUser = async (userData: IUser): Promise<returnUser> => {
    const {
        id,
        email,
        password,
        emailToken,
        isVerified,
        privateKey,
        imageUri
    } = userData;
    try {
        const user = User.create({
            id,
            email,
            password,
            emailToken,
            isVerified,
            role: 'user',
            privateKey,
            imageUri,
        });

        const errors = await validate(user)
        if (errors.length > 0) throw errors

        await user.save()
        return {
            success: true,
            data: null,
            error: null,
        }
    } catch (err) {
        console.log("createUser error check : ", err)
        return {
            success: false,
            data: null,
            error: "회원가입 실패"
        }
    }
}

const deleteUserFromId = async (userId: string): Promise<returnUser> => {
    try {
        const user = await User.findOneOrFail({ id: userId, role: 'user' });
        // 추가해야 검사해줌
        if (user) {
            await user.remove();
        }
        else {
            throw "아이디가 없음"
        }
        return {
            success: true,
            data: null,
            error: null,
        }
    } catch (err) {
        return {
            success: false,
            data: null,
            error: "회원탈퇴 실패"
        }
    }
}

// const updateUser = async (user: IUser | any): Promise<returnUser> => {
//     const { id, emailToken } = await user;
//     console.log("update User : ", user);
//     try {
//         const errors = await validate(user)
//         if (errors.length > 0) throw errors
//         const result = await getConnection()
//             .createQueryBuilder()
//             .update(User)
//             .set({
//                 emailToken: "asdf",
//                 isVerified: false
//             })
//             .where("id = :id", { id: id })
//             .execute();
//         console.log(result)
//         return {
//             success: true,
//         }
//     } catch (err) {
//         return {
//             success: false,
//             error: "Something went wrong"
//         }
//     }
// }

const updateUser = async (user: IUser | any): Promise<returnUser> => {
    const { id, email, emailToken }: { id: string, email: string, emailToken: string } = user;
    try {
        const validateUser = new User({ id, email, emailToken });
        const errors = await validate(validateUser, { skipMissingProperties: true })
        if (errors.length > 0) {
            throw errors
        }
        await User.update({ id }, { emailToken, email, isVerified: false })
        return {
            success: true,
            data: null,
            error: null,
        }
    } catch (err) {
        console.log("updateUser check error", err)
        return {
            success: false,
            data: null,
            error: null,
        }
    }
}


const getUserFromId = async (userData: IReadUser): Promise<returnApi> => {
    const { id } = userData;
    try {
        const user = await User.findOneOrFail({ id });
        const sanitizeUserData = await sanitizeUser(user);
        return {
            success: true,
            data: { user: sanitizeUserData },
            error: null,
        }
    } catch (err) {
        return {
            success: false,
            data: null,
            error: "getUser 에러"
        }
    }
}

const loginCheckUser = async (userData: ILoginUser): Promise<returnApi> => {
    const { id, password } = userData;
    try {
        const user = await User.findOneOrFail({ id });
        const match = await bcrypt.compare(password, user.password)
        if (!match) throw "비밀번호가 일치하지 않습니다."
        return {
            success: true,
            data: {
                user: {
                    id: user.id
                }
            },
            error: null,
        }
    } catch (error: any) {
        return {
            success: false,
            data: null,
            error
        }
    }
}

const verifyEmailUser = async ({ emailToken }: { emailToken: string }): Promise<returnUser> => {
    try {
        const user = await User.findOneOrFail({ emailToken });
        user.emailToken = null;
        user.isVerified = true;
        await user.save();
        return {
            success: true,
            data: null,
            error: null,
        }
    } catch (error) {
        return {
            success: false,
            data: null,
            error: "이메일 인증 실패",
        }
    }
}

const checkEmailVerifyFromId = async ({ id }: { id: string }): Promise<returnUser> => {
    try {
        const user = await User.findOneOrFail({ id })
        if (user.isVerified) {
            return {
                success: true,
                data: null,
                error: null,
            }
        }
        else {
            return {
                success: false,
                data: null,
                error: "이메일 인증을 받아야 합니다."
            }
        }
    } catch (error) {
        return {
            success: false,
            data: null,
            error: "아이디가 없습니다."
        }
    }
}

export {
    createUser,
    getUserFromId,
    deleteUserFromId,
    loginCheckUser,
    verifyEmailUser,
    checkEmailVerifyFromId,
    updateUser
}
