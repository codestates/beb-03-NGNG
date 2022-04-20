import connection from '../typeorm/connection';
import http from './supertest'
import login from './modules/login';

describe('main Page', () => {
    beforeEach(async () => {
        try {
            await connection.createDatabase()
            const option = {
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: process.env.DATABASE_ID,
                password: process.env.DATABASE_PASSWORD,
                database: "test",
                // synchronize: true,
                // logging: true,
                entities: ["**/entity/*.ts"],
                subscribers: ["src/migration/*.ts"],
                migrations: ["src/migration/*.ts"],
            }
            await connection.create(option);
        } catch (e) {
            console.log(e)
            console.error(e);
        }
    });


    test("login success", async () => {
        const cookies = await login(http);
        console.log(cookies)
        const response = await http.get('/api/user/logout').set('Cookie', cookies);
        expect(response.status).toEqual(302)
        expect(response.headers.location).toContain(
            '/user/login',
        )
    })

    test('GET /api/post/getPosts 201', async () => {
        const response = await http.get('/api/post/getPosts')
        expect(response.status).toEqual(201);

    });
    afterEach((done) => {
        connection.close()
        done()
    })

});


