const formatTopicsData = require('../db/utils/data-manipulation');

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