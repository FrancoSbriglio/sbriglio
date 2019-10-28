import { Moment } from 'moment';
import { IPersona } from 'app/shared/model/persona.model';

export interface ICarnetDeConducir {
  id?: number;
  categoria?: string;
  fechaOtorgamiento?: Moment;
  fechaVencimiento?: Moment;
  carnetPersona?: IPersona;
}

export class CarnetDeConducir implements ICarnetDeConducir {
  constructor(
    public id?: number,
    public categoria?: string,
    public fechaOtorgamiento?: Moment,
    public fechaVencimiento?: Moment,
    public carnetPersona?: IPersona
  ) {}
}
