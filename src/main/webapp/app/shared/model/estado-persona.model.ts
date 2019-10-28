import { IPersona } from 'app/shared/model/persona.model';

export interface IEstadoPersona {
  id?: number;
  nombreEstadoPersona?: string;
  estadoPersona?: IPersona;
}

export class EstadoPersona implements IEstadoPersona {
  constructor(public id?: number, public nombreEstadoPersona?: string, public estadoPersona?: IPersona) {}
}
