import express from "express";
import "reflect-metadata";
import routes from "../routes";
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';

import options from '../swagger.option'
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const server = express()

// if (process.env.NODE_ENV !== 'production') {
//     server.use(cors({
//         origin: '*'
//     }));
// }

server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
const swaggerSpec = swaggerJsdoc(options);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

require('dotenv').config();
server.use(cookieParser())
server.use(express.json())
server.use(express.urlencoded({ extended: false }));
server.use(express.json())
server.use(morgan('combined'));
server.use(hpp());
server.use(helmet({ contentSecurityPolicy: false }));
// server.use(express.static(path.join(__dirname, '../public')))
server.use('/api', routes)

export default server;
