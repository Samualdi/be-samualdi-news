const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require('../app');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('/api/topics', () => {
    test('200: returns all topics', async () => {
        const res = await request(app)
            .get('/api/topics')
            .expect(200)
             expect(res.body.topics).toHaveLength(3);
                res.body.topics.forEach(topic => {
                    expect(topic).toMatchObject({
                        slug: expect.any(String),
                        description: expect.any(String)
                    })
                })
                expect(res.body.topics[0]).toEqual({
                slug: "mitch",
                description: "The man, the Mitch, the legend"
                });
        })
          
    });
    




