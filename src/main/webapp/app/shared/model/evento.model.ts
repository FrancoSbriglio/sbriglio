import { Moment } from 'moment';
import { IDomicilio } from 'app/shared/model/domicilio.model';
import { IEspacioComun } from 'app/shared/model/espacio-comun.model';
import { IPersona } from 'app/shared/model/persona.model';
import { IEstadoEvento } from 'app/shared/model/estado-evento.model';
import { IPeriodoEspacioComun } from 'app/shared/model/periodo-espacio-comun.model';
import { IDetalleEvento } from 'app/shared/model/detalle-evento.model';

export interface IEvento {
  id?: number;
  nombreEvento?: string;
  fecha?: Moment;
  horaInicio?: Moment;
  horaFin?: Moment;
  eventoDomicilio?: IDomicilio;
  eventoEspacio?: IEspacioComun;
  eventoPersona?: IPersona;
  estadoEvento?: IEstadoEvento;
  eventoPeriodo?: IPeriodoEspacioComun;
  eventoDetalles?: IDetalleEvento[];
}

export class Evento implements IEvento {
  constructor(
    public id?: number,
    public nombreEvento?: string,
    public fecha?: Moment,
    public horaInicio?: Moment,
    public horaFin?: Moment,
    public eventoDomicilio?: IDomicilio,
    public eventoEspacio?: IEspacioComun,
    public eventoPersona?: IPersona,
    public estadoEvento?: IEstadoEvento,
    public eventoPeriodo?: IPeriodoEspacioComun,
    public eventoDetalles?: IDetalleEvento[]
  ) {}
}
