import { describe, expect, it } from "vitest";
import { Angle } from "../../src/01-fundamentals/angle";
import { isEven, isPalindrome, toAngle } from "../../src/01-fundamentals/basics";

describe("Basics", () => {
  it("palindrome", () => {
    expect(isPalindrome("racecar")).toBe(true);
    expect(isPalindrome("kayak")).toBe(true);
    expect(isPalindrome("nein")).toBe(false);
  });

  it("evenNumbers", () => {
    expect(isEven(2)).toBe(true);
    expect(isEven(101)).toBe(false);
  });

  it("angles", () => {
    expect(toAngle(1)).toEqual(new Angle(1));
    expect(toAngle(361)).toEqual(new Angle(1));
    expect(toAngle(360)).toEqual(new Angle(0));
    expect(toAngle(-1)).toEqual(new Angle(-1));
  });
});
