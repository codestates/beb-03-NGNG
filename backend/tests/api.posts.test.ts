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
                // dropSchema: true,
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


    test("POST /api/post/sendPost 200", async () => {
        const cookies = await login(http);
        const response = await http.post('/api/post/sendPost').set('Cookie', cookies).send({
            title: "첫 게시글",
            content: "ㅁㄴㅇㄹㄹㅇㅁㄴㄻㅇㄴㄻㄴㅇㅁㄹㄴㅇㄻㄴㅇ",
            category: "noticeBoard"
        });
        expect(response.status).toEqual(201);
    })

    test('GET /api/post/getPost 201', async () => {
        const postUuid = "a926a3ac-a90d-4a08-b99a-0bcc1b8d1dd3"
        const response = await http.post(`/api/post/getPost?postUuid=${postUuid}`);
        expect(response.status).toEqual(201);
    });

    test('GET /api/post/getPosts 201', async () => {
        const response = await http.get('/api/post/getPosts')
        expect(response.status).toEqual(201);
    });

    // test('GET /api/post/getCategoryPosts 201', async () => {
    //     const response = await http.get('/api/post/getPosts')
    //     expect(response.status).toEqual(201);
    // });


    // test('GET /api/post/likeIt 201', async () => {
    //     const response = await http.get('/api/post/getPosts')
    //     expect(response.status).toEqual(201);
    // });


    // test('GET /api/post/getLikeIt 201', async () => {
    //     const response = await http.get('/api/post/getPosts')
    //     expect(response.status).toEqual(201);
    // });


    afterEach((done) => {
        connection.close()
        done()
    })

});