const { formatData } = require('../db/utils/data-manipulation');
const checkExists = require('../db/utils/data-validation');
const testData = require("../db/data/test-data/index");
const seed = require('../db/seeds/seed');
const db = require('../db/connection');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('formatData', () => {
  test('returns an empty array when passed an empty array', () => {
    const input = [];
        const actual = formatData(input);
        const expected = [];
        expect(actual).toEqual(expected);
        expect(actual).not.toBe(expected);
  });
  
  test('returns a new array with a single nested array of data when passed a single object in an array', () => {
    let input = [
      {
        description: "The man, the Mitch, the legend",
        slug: "mitch",
      },
    ];
    let actual = formatData(input);
    let expected = [["The man, the Mitch, the legend", "mitch"]];
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(expected);

     input = [
            {
                username: "butter_bridge",
                name: "jonny",
                avatar_url:
                    "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
            }
        ];
        actual = formatData(input);
        expected = [
            [
                "butter_bridge",
                "jonny",
                "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
            ]
        ];
        expect(actual).toEqual(expected);
        expect(actual).not.toBe(expected);
    
  });

  test("returns an array with multiple nested arrays of data when passed an array of multiple objects", () => {
    let input = [
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
    let actual = formatData(input);
    let expected = [
      ["The man, the Mitch, the legend", "mitch"],
      ["Not dogs", "cats"],
      ["what books are made of", "paper"],
    ];
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(expected);

    input = [
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
    actual = formatData(input);
    expected = [
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

  test("does not mutate the input", () => {
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
    formatData(input);
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
  
describe('checkExists', () => {
  test("returns a rejected promise if passed an article_id that does not exist ", async () => {
    const tableName = "articles";
    const columnName = "article_id";
    const value = 250;

    //NEED TO WORK OUT APPROPRIATE TEST

    // checkExists(tableName, columnName, value).then(() => {
      
    // })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    // await expect(checkExists(tableName, columnName, value)).rejects();
    
  })
})
