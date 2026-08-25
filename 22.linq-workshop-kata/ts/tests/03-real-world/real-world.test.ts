import { beforeAll, describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Component, RawComponent, parseComponent } from "../../src/03-real-world/watch/component";
import { ComponentType } from "../../src/03-real-world/watch/component-type";
import { sameMembers } from "../support/collections";

const currentDir = dirname(fileURLToPath(import.meta.url));

describe("RealWorld", () => {
  let watch: Component;

  beforeAll(() => {
    const raw = JSON.parse(readFileSync(join(currentDir, "watch.json"), "utf-8")) as RawComponent;
    watch = parseComponent(raw);
  });

  it("allComponents", () => {
    const totalCount = 0;

    expect(totalCount).toBe(564);
  });

  it("markers", () => {
    const markers: Component[] | undefined = undefined;

    expect(markers!).toHaveLength(14);
    sameMembers(
      markers!.map((m) => m.name),
      [
        "Markers 305",
        "Markers 142",
        "Markers 243",
        "Markers 269",
        "Markers 288",
        "Markers 333",
        "Markers 338",
        "Markers 345",
        "Markers 426",
        "Markers 457",
        "Markers 468",
        "Markers 472",
        "Markers 494",
        "Markers 540",
      ]
    );
  });

  it("findAllComponentStartingWith", () => {
    const countDial = 0;

    expect(countDial).toBe(18);
  });

  it("countComponentByTypes", () => {
    const types: Map<ComponentType, number> | undefined = undefined;

    expect(types!.get(ComponentType.Oscillator)).toBe(25);
    expect(types!.get(ComponentType.BalanceWheel)).toBe(18);
    expect(types!.get(ComponentType.Wheel)).toBe(19);
  });

  it("mostComplex", () => {
    const mostComplexComponent: Component | undefined = undefined;
    const componentsInsideBezel = 0;

    expect(mostComplexComponent!.name).toBe("Bezel 1");
    expect(componentsInsideBezel).toBe(38);
  });

  it("averageComponentsByType", () => {
    const averageSubcomponentsByType: Map<ComponentType, number> | undefined = undefined;
  });
});
