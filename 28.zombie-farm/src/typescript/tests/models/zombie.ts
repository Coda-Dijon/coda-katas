import { JsonArrayOf, JsonIgnore, JsonName, JsonType } from "../../src/annotations.js";
import { BodyPart } from "./bodyPart.js";
import { Necromancer } from "./necromancer.js";

export class Zombie {
  // Convention collective des morts-vivants
  static readonly MAX_HOURS_PER_DAY = 24;

  @JsonName("zombie_name") name = "";
  hoursWorkedToday = 0;
  brainsPerHour = 0;
  unionized = false;
  @JsonType(() => Necromancer) supervisor: Necromancer | null = null;
  @JsonArrayOf(() => BodyPart) missingBodyParts: BodyPart[] = [];
  skills: string[] = [];

  // RGPD des morts-vivants : l'identité humaine ne doit jamais sortir de l'élevage
  @JsonIgnore() humanIdentity = "";
}
