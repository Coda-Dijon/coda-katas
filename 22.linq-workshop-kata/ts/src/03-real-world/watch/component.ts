import { ComponentType, toComponentType } from "./component-type";

export interface RawComponent {
  name: string;
  id: string;
  type: string;
  components: RawComponent[];
}

export interface Component {
  readonly name: string;
  readonly id: string;
  readonly type: ComponentType;
  readonly components: ReadonlyArray<Component>;
}

export function parseComponent(raw: RawComponent): Component {
  return {
    name: raw.name,
    id: raw.id,
    type: toComponentType(raw.type),
    components: raw.components.map(parseComponent),
  };
}
