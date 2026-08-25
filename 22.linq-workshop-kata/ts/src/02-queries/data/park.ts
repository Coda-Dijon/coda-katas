import { PetType } from "./pet-type";

export class Park {
  readonly name: string;
  readonly authorizedPetTypes: ReadonlyArray<PetType>;

  constructor(name: string, authorizedPetTypes: PetType[] = []) {
    this.name = name;
    this.authorizedPetTypes = [...authorizedPetTypes];
  }

  addAuthorizedPetType(petType: PetType): Park {
    return new Park(this.name, [...this.authorizedPetTypes, petType]);
  }
}
