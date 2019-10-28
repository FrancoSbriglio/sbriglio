import { Moment } from 'moment';
import { IPersona } from 'app/shared/model/persona.model';

export interface IArt {
  id?: number;
  fechaVencimientoArt?: Moment;
  artDersona?: IPersona;
}

export class Art implements IArt {
  constructor(public id?: number, public fechaVencimientoArt?: Moment, public artDersona?: IPersona) {}
}
