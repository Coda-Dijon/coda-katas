import { JsonName } from "../../src/annotations.js";

export class Necromancer {
  name = "";
  @JsonName("dark_title") title = "";
  yearsOfService = 0;
}
