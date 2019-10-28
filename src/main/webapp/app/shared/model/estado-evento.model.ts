export interface IEstadoEvento {
  id?: number;
  nombreEstadoEvento?: string;
}

export class EstadoEvento implements IEstadoEvento {
  constructor(public id?: number, public nombreEstadoEvento?: string) {}
}
