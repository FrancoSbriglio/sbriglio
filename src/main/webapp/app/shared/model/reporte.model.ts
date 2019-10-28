import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IReporte {
  id?: number;
  fecha?: Moment;
  descripcion?: string;
  reportePersona?: IUser;
}

export class Reporte implements IReporte {
  constructor(public id?: number, public fecha?: Moment, public descripcion?: string, public reportePersona?: IUser) {}
}
