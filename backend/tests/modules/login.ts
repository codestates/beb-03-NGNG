
const getLoginSession: any = async (http: any) => {
    const response = await http.post('/api/user/login').send({ id: "zxcvzxcv", password: "zxcvzxcv" });
    expect(response.status).toBe(201);
    // console.log(response.header)
    const sessionCookie: Array<string> = response.header['set-cookie'][0]
        .split(',')
        .map((cookie: string) => {
            return cookie.split(';')[0];
        })
    return sessionCookie;
};

export default getLoginSession


