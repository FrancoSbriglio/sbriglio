export interface IModelo {
  id?: number;
  nombreModelo?: string;
}

export class Modelo implements IModelo {
  constructor(public id?: number, public nombreModelo?: string) {}
}
