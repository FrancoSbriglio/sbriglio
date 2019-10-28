export interface IAseguradora {
  id?: number;
  nombreSeguro?: string;
}

export class Aseguradora implements IAseguradora {
  constructor(public id?: number, public nombreSeguro?: string) {}
}
