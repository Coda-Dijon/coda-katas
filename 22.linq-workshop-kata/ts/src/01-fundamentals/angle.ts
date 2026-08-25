export class Angle {
  private readonly degrees: number;

  constructor(degrees: number) {
    this.degrees = Angle.normalize(degrees);
  }

  private static normalize(value: number): number {
    return ((value % 360) + 360) % 360;
  }

  plus(other: Angle): Angle {
    return new Angle(this.degrees + other.degrees);
  }

  minus(other: Angle): Angle {
    return new Angle(this.degrees - other.degrees);
  }

  toString(): string {
    return `${this.degrees}°`;
  }
}
