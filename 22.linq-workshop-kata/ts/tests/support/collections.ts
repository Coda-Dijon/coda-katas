import { expect } from "vitest";

/** Asserts that `actual` and `expected` hold the same elements, regardless of order. */
export function sameMembers<T>(actual: T[], expected: T[]): void {
  const sort = (values: T[]) =>
    [...values].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

  expect(sort(actual)).toEqual(sort(expected));
}
