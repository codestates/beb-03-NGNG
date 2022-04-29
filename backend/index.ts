import connection from './typeorm/connection';
import { createConnections } from "typeorm";
import server from './config/express';
import { setToken } from './utilities/ether';

const port = process.env.PORT || 5000;

const Server = async () => {
    try {
        await connection.createDatabase();
        await connection.create();
        await setToken();
        // 프론트 서버 시작
        server.listen(port, (err?: any) => {
            if (err) throw err;
            console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
        });

    } catch (e) {
        // connection.close()
        console.error(e);
        process.exit(1);
    }
};
Server();
