import connection from './typeorm/connection';
import server from './config/express';
import { setToken } from './utilities/ether';

const port = process.env.PORT || 5000;

const Server = async () => {
    try {
        await connection.createDatabase();
        console.log("database 생성");
        await connection.create();
        console.log("database 연결");
        await setToken();
        console.log("erc721 거래용 토큰(erc20) 세팅");
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
