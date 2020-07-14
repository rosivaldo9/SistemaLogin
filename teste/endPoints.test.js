const newUser = require('./User.json')
const request = require('supertest')

const app = require('../src/index')

describe('Testando EndPoints', ()=>{

    it("Testando post", async ()=>{
        const response = await request(app)
        .post('/auth/register')
        .send(newUser)
        expect(response.statusCode).toBe(409);
    });
});