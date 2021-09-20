const { formatTopicsData, formatUsersData, formatArticlesData } = require('../db/utils/data-manipulation');

describe('formatTopicsData', () => {
    test('returns a new empty array when passed an empty array', () => {
        const input = [];
        const actual = formatTopicsData(input);
        const expected = [];
        expect(actual).toEqual(expected);
        expect(actual).not.toBe(expected);
    });

    test('returns a new array with a single nested array of topics data when passed a single topic object in an array', () => {
        const input = [
          {
            description: "The man, the Mitch, the legend",
            slug: "mitch",
          },
        ];
        const actual = formatTopicsData(input);
        const expected = [["The man, the Mitch, the legend", "mitch"]];
        expect(actual).toEqual(expected);
        expect(actual).not.toBe(expected);
    });

    test('returns an array with multiple nested arrays of topics data when passed an array of multiple topic objects', () => {
        const input = [
          {
            description: "The man, the Mitch, the legend",
            slug: "mitch",
          },
          {
            description: "Not dogs",
            slug: "cats",
          },
          {
            description: "what books are made of",
            slug: "paper",
          },
        ];
        const actual = formatTopicsData(input);
        const expected = [
          ["The man, the Mitch, the legend", "mitch"],
          ["Not dogs", "cats"],
          ["what books are made of", "paper"]
        ];
        expect(actual).toEqual(expected);
        expect(actual).not.toBe(expected);
    });

    test('does not mutate the input', () => {

        const input = [
          {
            description: "The man, the Mitch, the legend",
            slug: "mitch",
          },
          {
            description: "Not dogs",
            slug: "cats",
          },
          {
            description: "what books are made of",
            slug: "paper",
          },
        ];
      formatTopicsData(input);
        expect(input).toEqual([
          {
            description: "The man, the Mitch, the legend",
            slug: "mitch",
          },
          {
            description: "Not dogs",
            slug: "cats",
          },
          {
            description: "what books are made of",
            slug: "paper",
          },
        ]);
        
    });
    
});

describe('formatUsersData', () => {
    test('returns a new empty array when passed an empty array', () => {
        const input = [];
        const actual = formatUsersData(input);
        const expected = [];
        expect(actual).toEqual(expected);
        expect(actual).not.toBe(expected);
        
    });

    test("returns a new array with a single nested array of users data when passed a single user object in an array", () => {
        const input = [
            {
                username: "butter_bridge",
                name: "jonny",
                avatar_url:
                    "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
            }
        ];
        const actual = formatUsersData(input);
        const expected = [
            [
                "butter_bridge",
                "jonny",
                "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
            ]
        ];
        expect(actual).toEqual(expected);
        expect(actual).not.toBe(expected);
    });

    test("returns an array with multiple nested arrays of users data when passed an array of multiple users objects", () => {
        const input = [
          {
            username: "butter_bridge",
            name: "jonny",
            avatar_url:
              "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
          },
          {
            username: "icellusedkars",
            name: "sam",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
          },
          {
            username: "rogersop",
            name: "paul",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
          },
        ];
        const actual = formatUsersData(input);
        const expected = [
          [
            "butter_bridge",
            "jonny",
            "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
          ],
          [
            "icellusedkars",
            "sam",
            "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
          ],
          [
            "rogersop",
            "paul",
            "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
          ],
        ];
        expect(actual).toEqual(expected);
        expect(actual).not.toBe(expected);

    });
    
    test('does not mutate input array', () => {
        const input = [
          {
            username: "butter_bridge",
            name: "jonny",
            avatar_url:
              "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
          },
          {
            username: "icellusedkars",
            name: "sam",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
          },
          {
            username: "rogersop",
            name: "paul",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
          },
        ];
        formatUsersData(input);
        expect(input).toEqual([
          {
            username: "butter_bridge",
            name: "jonny",
            avatar_url:
              "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
          },
          {
            username: "icellusedkars",
            name: "sam",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
          },
          {
            username: "rogersop",
            name: "paul",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
          },
        ]);
        
    });
    
});

describe('formatArticlesData', () => {
    test('returns an empty array when passed an empty array', () => {
        const input = [];
        const actual = formatArticlesData(input);
        const expected = [];

        expect(actual).toEqual(expected);
        expect(actual).not.toBe(expected);
        
    });

    test("returns a new array with a single nested array of articles data when passed a single article object in an array", () => {
        const input = [{
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: new Date(1594329060000),
            votes: 100
        }]
        const actual = formatArticlesData(input)
        const expected = [['Living in the shadow of a great man', 'mitch', 'butter_bridge', 'I find this existence challenging', new Date(1594329060000), 100]]
        expect(actual).toEqual(expected);
        expect(actual).not.toBe(expected);
    });
    
    test("returns an array with multiple nested arrays of articles data when passed an array of multiple articles objects", () => {
         const input = [
           {
             title: "Living in the shadow of a great man",
             topic: "mitch",
             author: "butter_bridge",
             body: "I find this existence challenging",
             created_at: new Date(1594329060000),
             votes: 100,
           },
           {
             title: "Sony Vaio; or, The Laptop",
             topic: "mitch",
             author: "icellusedkars",
             body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
             created_at: new Date(1602828180000),
             votes: 0,
           },
           {
             title: "Eight pug gifs that remind me of mitch",
             topic: "mitch",
             author: "icellusedkars",
             body: "some gifs",
             created_at: new Date(1604394720000),
             votes: 0,
           },
         ];
         const actual = formatArticlesData(input);
         const expected = [
           [
             "Living in the shadow of a great man",
             "mitch",
             "butter_bridge",
             "I find this existence challenging",
             new Date(1594329060000),
             100,
           ],
           [
             "Sony Vaio; or, The Laptop",
             "mitch",
             "icellusedkars",
             "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
             new Date(1602828180000),
             0,
           ],
           [
             "Eight pug gifs that remind me of mitch",
             "mitch",
             "icellusedkars",
             "some gifs",
               new Date(1604394720000),
             0
           ]
         ];
         expect(actual).toEqual(expected);
         expect(actual).not.toBe(expected);
    });

    test('does not mutate input', () => {
        const input = [
          {
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: new Date(1594329060000),
            votes: 100,
          },
          {
            title: "Sony Vaio; or, The Laptop",
            topic: "mitch",
            author: "icellusedkars",
            body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
            created_at: new Date(1602828180000),
            votes: 0,
          },
          {
            title: "Eight pug gifs that remind me of mitch",
            topic: "mitch",
            author: "icellusedkars",
            body: "some gifs",
            created_at: new Date(1604394720000),
            votes: 0,
          },
        ];
        formatArticlesData(input);
        expect(input).toEqual([
          {
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: new Date(1594329060000),
            votes: 100,
          },
          {
            title: "Sony Vaio; or, The Laptop",
            topic: "mitch",
            author: "icellusedkars",
            body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
            created_at: new Date(1602828180000),
            votes: 0,
          },
          {
            title: "Eight pug gifs that remind me of mitch",
            topic: "mitch",
            author: "icellusedkars",
            body: "some gifs",
            created_at: new Date(1604394720000),
            votes: 0,
          },
        ]);
        
    });
});

describe('formatCommentsData', () => {
    test('returns empty array when passed an empty array', () => {
        const input = [];
        const actual = formatCommentsData(input);
        const expected = [];

        expect(actual).toEqual(expected);
        expect(actual).not.toBe(expected);
        
    });
    
    test("returns a new array with a single nested array of comment data when passed a single comment object in an array", () => {
      const input = [
        {
          body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          votes: 16,
          author: "butter_bridge",
          article_id: 9,
          created_at: new Date(1586179020000),
        },
      ];
      const actual = formatCommentsData(input);
      const expected = [
        [
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          16,
          "butter_bridge",
          9,
          new Date(1586179020000),
        ],
      ];

      expect(actual).toEqual(expected);
      expect(actual).not.toBe(expected);
    });

    test("returns a new array with a multiple nested array of comment data when passed multiple comment objects in an array", () => {
      const input = [
        {
          body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          votes: 16,
          author: "butter_bridge",
          article_id: 9,
          created_at: new Date(1586179020000),
        },
        {
          body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
          votes: 14,
          author: "butter_bridge",
          article_id: 1,
          created_at: new Date(1604113380000),
        },
        {
          body: "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
          votes: 100,
          author: "icellusedkars",
          article_id: 1,
          created_at: new Date(1583025180000),
        },
      ];
      const actual = formatCommentsData(input);
      const expected = [
        [
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          16,
          "butter_bridge",
          9,
          new Date(1586179020000),
        ],
        [
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
          14,
          "butter_bridge",
            1,
            new Date(1604113380000),
        ],
        [
          "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
          100,
          "icellusedkars",
          1,
          new Date(1583025180000),
        ]
      ];

      expect(actual).toEqual(expected);
      expect(actual).not.toBe(expected);
    });

    test('does not mutate input', () => {
        const input = [
          {
            body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
            votes: 16,
            author: "butter_bridge",
            article_id: 9,
            created_at: new Date(1586179020000),
          },
          {
            body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
            votes: 14,
            author: "butter_bridge",
            article_id: 1,
            created_at: new Date(1604113380000),
          },
          {
            body: "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
            votes: 100,
            author: "icellusedkars",
            article_id: 1,
            created_at: new Date(1583025180000),
          },
        ];
        formatCommentsData(input);
        
        expect(input).toEqual([
          {
            body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
            votes: 16,
            author: "butter_bridge",
            article_id: 9,
            created_at: new Date(1586179020000),
          },
          {
            body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
            votes: 14,
            author: "butter_bridge",
            article_id: 1,
            created_at: new Date(1604113380000),
          },
          {
            body: "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
            votes: 100,
            author: "icellusedkars",
            article_id: 1,
            created_at: new Date(1583025180000),
          },
        ]);

    });
});



