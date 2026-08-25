import { PetType } from "./pet-type";

export interface Pet {
  readonly type: PetType;
  readonly name: string;
  readonly age: number;
}
