import { createConnection, createConnections, getConnection, Connection } from 'typeorm';
import { createDatabase } from "typeorm-extension";


export let connections: Array<Connection> | undefined = undefined;

const connection = {
    async createDatabase() {
        // ormconfig.js 의 database이름으로 database 생성
        await createDatabase({ ifNotExist: true, charset: "utf8mb4_general_ci", characterSet: "utf8mb4" });
    },

    async create(option: any = null) {
        // typeorm 연결
        // option ? await createConnection(option) : await createConnection();
        connections = await createConnections([
            {
                name: 'default',
                type: "mysql",
                host: "localhost",
                port: 3306,
                logging: true,
                username: process.env.DATABASE_ID,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                entities: ["typeorm/entity/*{.ts,.js}"],
                synchronize: true
            },
            {
                name: "dev",
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: process.env.DATABASE_PASSWORD,
                database: "dev",
                entities: ["typeorm/entity/demon/*{.ts,.js}"],
            }
        ])
        // console.log(connections)
    },

    async close() {
        // typerom 연결 삭제
        await getConnection().close();
    },

    async clear() {
        const connection = getConnection();
        const entities = connection.entityMetadatas;

        entities.forEach(async (entity) => {
            const repository = connection.getRepository(entity.name);
            await repository.query(`DELETE FROM ${entity.tableName}`);
        });
    },
};
export default connection;