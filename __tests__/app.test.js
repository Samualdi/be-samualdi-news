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

describe('PATCH/api/articles/:article_id', () => {
    test('200: returns the updated article based on the input_id with relevant keys and correct number of votes when passed a positive value of inc_votes', async () => {
        const res = await request(app)
            .patch('/api/articles/1')
            .send({ inc_votes: 10 })
            .expect(200)
        expect(res.body.updatedArticle.votes).toBe(110);
        expect(res.body.updatedArticle.article_id).toBe(1);
        const keysFromObject = Object.keys(res.body.updatedArticle);
        expect(keysFromObject).toEqual(['article_id','title', 'body', 'votes', 'topic', 'author', 'created_at']
        );
    });

    test('200: returns the updated article based on the input_id with relevant keys and correct number of votes when passed a negative value for inc_votes', async () => {
        const res = await request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: -10 })
          .expect(200);
        expect(res.body.updatedArticle.votes).toBe(90);
        expect(res.body.updatedArticle.article_id).toBe(1);
        const keysFromObject = Object.keys(res.body.updatedArticle);
        expect(keysFromObject).toEqual([
          "article_id",
          "title",
          "body",
          "votes",
          "topic",
          "author",
          "created_at",
        ]);
    
    });

    test("400: returns an error when passed an empty object as part of the pathc request", async () => {
      const res = await request(app)
        .patch("/api/articles/1")
        .send({})
        .expect(400);
      expect(res.body.msg).toBe("Bad request");
    });

    test('400: returns error when passed an invlaid value for inc_votes (e.g. a string)', async () => {
        const res = await request(app)
          .patch("/api/articles/1")
          .send({inc_vote: 'notanumber'})
          .expect(400);
        expect(res.body.msg).toBe("Bad request");
    });

    test('400: returns an error when passed a valid inc_vote for an article_id that does not exist', async () => {
        const res = await request(app)
          .patch("/api/articles/334")
          .send({ inc_vote: 10 })
          .expect(400);
        expect(res.body.msg).toBe("Bad request");
    });

    test('400: returns an error when passed a valid inc_vote and an invalid article_id', async () => {
        const res = await request(app)
          .patch("/api/articles/notanumber")
          .send({ inc_vote: 10 })
          .expect(400);
        expect(res.body.msg).toBe("Bad request");
    });

});

describe('GET /api/articles/:article_id/comments', () => {
    test('200: returns an array of comments associated with the given article_id including the appropriate key:value pairs', async () => {
        const res = await request(app)
            .get('/api/articles/1/comments')
            .expect(200)
        expect(res.body.articleComments).toHaveLength(13);
        const expectedKeys = Object.keys(res.body.articleComments[0]);
        expect(expectedKeys).toEqual([`comment_id`,`votes`,`created_at`, `author`, `body`]);
    });

    test('200: returns an empty array when passed an article_id that exists but has no comments associated with with it.', async () => {
        const res = await request(app)
            .get('/api/articles/3/comments')
            .expect(200)
        expect(res.body.articleComments.length).toBe(0);
    });

    test('400: returns an error when passed an invalid article_id', async () => {
        const res = await request(app)
            .get('/api/articles/notanumber/comments')
            .expect(400)
        expect(res.body.msg).toBe('Bad request');
    });

    test('404: returns an error when passed an article_id that does not exist', async () => {
        const res = await request(app)
            .get("/api/articles/999/comments")
            .expect(404)
        expect(res.body.msg).toBe('Not found');
    });
    
});

describe('GET /api/articles', () => {
    test("200: returns an array of all articles with correct comment count (sorted by date descending as default) when passed no queries", async () => {
      const res = await request(app).get("/api/articles").expect(200);
      expect(res.body.articles.length).toBe(12);
      expect(res.body.articles[0].comment_count).toBe(0);
      expect(res.body.articles).toBeSortedBy("created_at", {
        descending: true,
      });
      res.body.articles.forEach((article) => {
        expect(Object.keys(article)).toEqual([
          "author",
          "title",
          "article_id",
          "topic",
          "created_at",
          "votes",
          "comment_count",
        ]);
      });
    });
    
    test('200: returns an array of articles sorted by a column other than created_at when passed as a query (defaulted to descending)', async () => {
        const res = await request(app)
            .get('/api/articles?sort_by=article_id')
            .expect(200)
        expect(res.body.articles).toBeSortedBy('article_id', { descending: true });
    });

    test('200: returns an array of articles ordered by created_by ascending when passed an order query of asc', async () => {
        const res = await request(app)
            .get("/api/articles?order=asc")
            .expect(200)
        expect(res.body.articles).toBeSortedBy('created_at');
        
    });

    test('200: returns an array sorted by a specified column in ascending order when passed column name and asc as queries', async () => {
        const res = await request(app)
            .get('/api/articles?sort_by=article_id&order=asc')
            .expect(200)
        expect(res.body.articles).toBeSortedBy('article_id');
    });

    test('200: returns an array filtered by topic when passed a topic query (with default descending order by created_at', async () => {
        const res = await request(app)
            .get('/api/articles?topic=mitch')
            .expect(200)
        expect(res.body.articles.length).toBe(11);
        expect(res.body.articles).toBeSortedBy('created_at', { descending: true });
    });

    test('400: return bad request when passed an invalid sort_by value as a query', async () => {
        const res = await request(app)
            .get('/api/articles?sort_by=123')
            .expect(400)
        expect(res.body.msg).toBe('Bad request');
        
    });

    test("400: return bad request when passed sort_by value as a query that does not exist", async () => {
      const res = await request(app)
        .get("/api/articles?sort_by=author_name")
        .expect(400);
      expect(res.body.msg).toBe("Bad request");
    });

    test('400: return a bad request error when passed an invalid sort query', async () => {
        const res = await request(app)
          .get("/api/articles?order=123")
          .expect(400);
        expect(res.body.msg).toBe("Bad request");
    });

    test('404: returns a not found error when passed a topic query that does not exist', async () => {
        const res = await request(app)
            .get("/api/articles?topic=banana")
            .expect(404)
        expect(res.body.msg).toBe("Not found");
    });

    
});

describe("POST /api/articles/:article_id/comments", () => {
    test('201: adds a comment to the relevant article identified by a passed in article_id. Returns the posted comment', async () => {
        const res = await request(app)
            .post('/api/articles/1/comments')
            .send({
                username: 'icellusedkars', body: 'Im adding a comment to see if it works'})
            .expect(201)
        expect(Object.keys(res.body.newComment[0])).toEqual([
          "comment_id",
          "author",
          "article_id",
          "votes",
          "created_at",
          "body",
        ]);
        expect(res.body.newComment[0].article_id).toBe(1);
    });

    test('405: returns method not allowed error when passed a comment with no body', async () => {
        const res = await request(app)
            .post('/api/articles/1/comments')
            .send({ username: 'icellusedkars'})
            .expect(405)
        expect(res.body.msg).toBe('Method not allowed');
        
    });

    test('405: returns method not allowed error when passed a comment with no username', async () => {
        const res = await request(app)
            .post('/api/articles/1/comments')
            .send({ body: 'This shouldnt post without a username' })
            .expect(405)
        expect(res.body.msg).toBe('Method not allowed');
        
    });

    test('400: returns a bad request error when passed an invalid article_id ', async () => {
        const res = await request(app)
            .post('/api/articles/notanum/comments')
            .send({username: 'icellusedkars', body: 'This wont work because of the dodgy id'})
            .expect(400)
        expect(res.body.msg).toBe('Bad request');
        
    });

    test('404: returns a not found error when passed a valid comment object to an article_id that doesnt exist', async () => {
        const res = await request(app)
            .post('/api/articles/254/comments')
            .send({ username: 'icellusedkars', body: 'This wont work because of the dodgy id' })
            .expect(404)
        expect(res.body.msg).toBe('Not found');
    });

    test('404: returns a not fouind error when passed a valid comment with a username that doesnt exist ', async () => {
        const res = await request(app)
          .post("/api/articles/3/comments")
          .send({
            username: "samualdi",
            body: "This wont work because of the dodgy id",
          })
          .expect(404);
        expect(res.body.msg).toBe("Not found");
    });

});

describe('GET/api', () => {
    test('200: returns all the availible endpoints in the API', async () => {
        const res = await request(app)
            .get('/api')
            .expect(200)
        expect(Object.keys(res.body)).toEqual(["GET /api", "GET /api/topics", "GET /api/articles", "GET /api/articles/:article_id", "PATCH /api/articles/:article_id", "GET /api/articles/:article_id/comments", "POST /api/articles/:article_id/comments"]);

        });
        
    });
    



    




