export class Category {
  name: string;
  taxPercentage: number;

  constructor(name: string, taxPercentage: number) {
    this.name = name;
    this.taxPercentage = taxPercentage;
  }
}
