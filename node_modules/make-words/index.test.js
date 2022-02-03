const {
  getWordByLength,
  getRandomWord,
  getWord,
  getWords,
  otherChars,
} = require("./index");

describe("#getWordByLength", () => {
  test("should return a string of length 5", () => {
    expect(getWordByLength(5).length).toBe(5);
  });
  test("should return a string of length 4", () => {
    expect(getWordByLength(4).length).toBe(4);
  });
  test("should return a string of length 3", () => {
    expect(getWordByLength(3).length).toBe(3);
  });
  test("should return a string of length 2", () => {
    expect(getWordByLength(2).length).toBe(2);
  });
  test("should return a string of length 1", () => {
    expect(getWordByLength(1).length).toBe(1);
  });
  test("should return a error", () => {
    expect(() => getWordByLength(0).length).toThrow(
      "length cant be less or equel to zero"
    );
  });

  test("should return a string of length 10", () => {
    expect(() => getWordByLength(16).length).toThrow(
      "length cant be bigger then"
    );
  });
});

describe("#getRandomWord", () => {
  test("should return a string", () => {
    expect(typeof getRandomWord()).toBe("string");
  });
});

describe("#getWord", () => {
  test("should return a string that contains the letter ק of length 5", () => {
    expect(getWord(5, ["ק"])).toContain("ק");
  });

  test("should return a string the contains the letters א and ב but not ג", () => {
    expect(getWord(2, ["א", "ב", "ג"])).toHaveLength(2);
    expect(getWord(2, ["א", "ב", "ג"], null, "א")).toContain("א");
    expect(getWord(2, ["א", "ב", "ג"], null, "ב")).toContain("ב");
    expect(getWord(2, ["א", "ב", "ג"], null, "ג")).toContain("ג");
  });
});

describe("#getWords", () => {
  test("get 20 words", () => {
    expect(getWords(20, 2, 8, ["א", "ב", "ג"], otherChars, "ב").length).toBe(
      20
    );
    expect(
      getWords(20, 3, 3, ["א", "ב", "ג"], otherChars, "ב").join("").length
    ).toBe(60);
  });
});
