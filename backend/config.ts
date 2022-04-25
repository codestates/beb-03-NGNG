require('dotenv').config();
export default {
    "mailConfig": {
        host: "smtp.gmail.com", //smpt 전용 gmail 주소
        port: 465, // or 587, 465는 SMTP의 대표로쓰이는 포트
        service: "gmail",
        secure: true, //true인 경우 TLS를 사용, TLS는 이후에 알아보자.
        auth: {
            type: "OAuth2", // TYPE는 당연히 OAuth2
            user: process.env.MAILER_EMAIL,
            clientId: process.env.MAILER_CLIENT_ID,
            clientSecret: process.env.MAILER_CLIENT_PWD,
            accessToken: process.env.MAILER_ACCTKN,
            refreshToken: process.env.MAILER_REFTKN,
            expires: 1484314697598,
        },
    }
}

