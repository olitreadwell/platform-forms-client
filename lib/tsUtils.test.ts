import { describe, expect, it } from "vitest";

import { hasOwnProperty, isServer, filterUndef } from "./tsUtils";

describe("hasOwnProperty", () => {
  it("returns true when the object has the own property", () => {
    expect(hasOwnProperty({ a: 1 }, "a")).toBe(true);
  });

  it("returns false when the property is missing", () => {
    expect(hasOwnProperty({ a: 1 }, "b")).toBe(false);
  });

  it("returns false for inherited properties", () => {
    expect(hasOwnProperty({ a: 1 }, "toString")).toBe(false);
  });
});

describe("isServer", () => {
  it("returns false when window is defined (jsdom/browser-like test environment)", () => {
    expect(isServer()).toBe(typeof window === "undefined");
  });
});

describe("filterUndef", () => {
  it("removes undefined entries and keeps the rest", () => {
    expect(filterUndef([1, undefined, 2, undefined, 3])).toEqual([1, 2, 3]);
  });

  it("removes falsy values, not just undefined, since the guard uses !!t", () => {
    expect(filterUndef([0, "", false, null, undefined, 1])).toEqual([1]);
  });

  it("returns an empty array when everything is filtered out", () => {
    expect(filterUndef([undefined, undefined])).toEqual([]);
  });

  it("returns all items unchanged when nothing is undefined", () => {
    expect(filterUndef(["a", "b", "c"])).toEqual(["a", "b", "c"]);
  });
});
