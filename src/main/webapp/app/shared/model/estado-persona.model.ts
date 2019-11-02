import { Moment } from 'moment';

export interface IEstadoPersona {
  id?: number;
  nombreEstadoPersona?: string;
  fecha?: Moment;
}

export class EstadoPersona implements IEstadoPersona {
  constructor(public id?: number, public nombreEstadoPersona?: string, public fecha?: Moment) {}
}
