"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
exports.default = {
    "mailConfig": {
        host: "smtp.gmail.com",
        port: 465,
        service: "gmail",
        secure: true,
        auth: {
            type: "OAuth2",
            user: process.env.MAILER_EMAIL,
            clientId: process.env.MAILER_CLIENT_ID,
            clientSecret: process.env.MAILER_CLIENT_PWD,
            accessToken: process.env.MAILER_ACCTKN,
            refreshToken: process.env.MAILER_REFTKN,
            expires: 1484314697598,
        },
    }
};
//# sourceMappingURL=config.js.map