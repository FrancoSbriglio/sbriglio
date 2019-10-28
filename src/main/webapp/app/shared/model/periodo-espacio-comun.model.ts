import { Moment } from 'moment';

export interface IPeriodoEspacioComun {
  id?: number;
  periodo?: Moment;
}

export class PeriodoEspacioComun implements IPeriodoEspacioComun {
  constructor(public id?: number, public periodo?: Moment) {}
}
