import { describe, expect, it } from "vitest";

const add = (x: number, y: number): number => x + y;
const multiply = (x: number, y: number): number => x * y;
const toBinary = (x: number): string => x.toString(2);

describe("PlayWithFunctions", () => {
  it("add1AndDoubleIt", () => {
    const five: number = 5;

    expect(five).toBe(6);
  });

  it("binaryPalindrome", () => {

  });
});
