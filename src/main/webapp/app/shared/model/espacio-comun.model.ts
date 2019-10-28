import { Moment } from 'moment';
import { IBarrio } from 'app/shared/model/barrio.model';
import { IPeriodoEspacioComun } from 'app/shared/model/periodo-espacio-comun.model';

export interface IEspacioComun {
  id?: number;
  nombreEspacioComun?: string;
  disponibilidadDesde?: Moment;
  disponibilidadHasta?: Moment;
  fotoEspacioComunContentType?: string;
  fotoEspacioComun?: any;
  horaDesde?: Moment;
  horaHasta?: Moment;
  espacioBarrio?: IBarrio;
  espacioTipos?: IPeriodoEspacioComun[];
}

export class EspacioComun implements IEspacioComun {
  constructor(
    public id?: number,
    public nombreEspacioComun?: string,
    public disponibilidadDesde?: Moment,
    public disponibilidadHasta?: Moment,
    public fotoEspacioComunContentType?: string,
    public fotoEspacioComun?: any,
    public horaDesde?: Moment,
    public horaHasta?: Moment,
    public espacioBarrio?: IBarrio,
    public espacioTipos?: IPeriodoEspacioComun[]
  ) {}
}
