const { formatTopicsData, formatUsersData } = require('../db/utils/data-manipulation');

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