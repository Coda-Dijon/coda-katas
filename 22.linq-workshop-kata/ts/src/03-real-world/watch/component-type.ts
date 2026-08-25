export enum ComponentType {
  Case = "Case",
  Cover = "Cover",
  Screws = "Screws",
  Screw = "Screw",
  Bezel = "Bezel",
  Insert = "Insert",
  Spring = "Spring",
  Crystal = "Crystal",
  Seal = "Seal",
  Movement = "Movement",
  Oscillator = "Oscillator",
  BalanceWheel = "BalanceWheel",
  Hairspring = "Hairspring",
  ShockAbsorber = "ShockAbsorber",
  Jewel = "Jewel",
  GearTrain = "GearTrain",
  Wheel = "Wheel",
  Pinion = "Pinion",
  Barrel = "Barrel",
  Mainspring = "Mainspring",
  Arbor = "Arbor",
  Bridge = "Bridge",
  Dial = "Dial",
  Markers = "Markers",
  Marker = "Marker",
  Hands = "Hands",
  Hand = "Hand",
  Strap = "Strap",
  Links = "Links",
  Link = "Link",
  Clasp = "Clasp",
  Pin = "Pin",
  Watch = "Watch",
}

const TYPE_ALIASES: Record<string, ComponentType> = {
  "Balance Wheel": ComponentType.BalanceWheel,
  "Shock Absorber": ComponentType.ShockAbsorber,
  "Gear Train": ComponentType.GearTrain,
};

export function toComponentType(rawType: string): ComponentType {
  return TYPE_ALIASES[rawType] ?? (rawType.replace(/ /g, "") as ComponentType);
}
