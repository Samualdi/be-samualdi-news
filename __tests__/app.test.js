const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require('../app');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET/api/topics', () => {
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
    
describe('GET/api/articles/article_id', () => {
    test('200: returns the article with the correct article_id ', async () => {
        const res = await request(app)
            .get('/api/articles/1')
            .expect(200)
        expect(res.body.article.article_id).toBe(1);
        expect(res.body.article.comment_count).toBe(13);
    
    });

    test('200:returned article contains the correct keys', async () => {
        const res = await request(app).get("/api/articles/1").expect(200);
        const keysFromObject = Object.keys(res.body.article);
        expect(keysFromObject).toEqual([
          "author",
          "title",
          "article_id",
          "body",
          "topic",
          "created_at",
          "votes",
          "comment_count",
        ]);
    });

    test('200:returned article has the corrent comment_count for the selected article', async  () => {
        const res = await request(app)
            .get('/api/articles/1')
            .expect(200)
        expect(res.body.article.comment_count).toBe(13);
    });

    test('400: returns an error when passed an invalid article_id', async () => {
        const res = await request (app)
            .get('/api/articles/notanumber')
            .expect(400)
        expect(res.body.msg).toBe('Bad request');
    });

    test('404: returns an error when passsed an article_id that does not exist (but is a valid data type)', async () => {
        const res = await request(app)
            .get('/api/articles/999')
            .expect(404)
        expect(res.body.msg).toBe('Not found');
    });
    
});
    




