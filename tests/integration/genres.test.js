const request = require('supertest');
const { Genres } = require('../../models/genres');
const {Users} = require('../../models/users');
let server;

describe('/api/genres', () =>{
    beforeEach(() => { server = require('../../index'); });
    afterEach( async() => {
        server.close();
        await Genres.remove({});
    });

    describe('GET/', () => {
        it('should return all genres', async () => {

            await Genres.collection.insertMany([
                {name: 'genre1'},
                {name: 'genre2'},
            ]);

           const res = await request(server).get('/api/genres');
           expect(res.status).toBe(200);
           expect(res.body.length).toBe(2);
           expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();

        })
    });

    describe('GET/:id', ()=> {

        it('should should return genre if valid id is passed', async () => {
            const genre = new Genres({name: 'genre1'});
            await genre.save();

            const res = await request(server).get('/api/genres/'+ genre._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);

        });

        it('should should return 404 if invalid id is passed', async () => {

            const res = await request(server).get('/api/genres/1');
            expect(res.status).toBe(404);

        });



    });

    describe('POST/', ()=> {
        it ('should return 401 if client is not logged in', async () => {
            const res = await request(server).post('/api/genres').send({name: 'genre1'});
            expect(res.status).toBe(401);
        });

        it ('should return 400 if genre is less than 3 characters', async () => {
            const token = new Users().generateAuthToken();

            const res = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({name: '12'});
            expect(res.status).toBe(400);
        });

        it ('should return 400 if genre is more than 50 characters', async () => {
            const token = new Users().generateAuthToken();

            const name = new Array(52).join('a');

            const res = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({name: name});
            expect(res.status).toBe(400);
        });
    });

});