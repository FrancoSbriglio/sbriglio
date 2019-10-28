export interface IColor {
  id?: number;
  nombreColor?: string;
}

export class Color implements IColor {
  constructor(public id?: number, public nombreColor?: string) {}
}
