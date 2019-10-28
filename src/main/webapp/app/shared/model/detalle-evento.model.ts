import { Moment } from 'moment';
import { IListaAmigos } from 'app/shared/model/lista-amigos.model';
import { IPersona } from 'app/shared/model/persona.model';
import { IVehiculo } from 'app/shared/model/vehiculo.model';

export interface IDetalleEvento {
  id?: number;
  horaIngreso?: Moment;
  horaEngreso?: Moment;
  amigosevento?: IListaAmigos;
  detallePersonaEvento?: IPersona;
  detalleEventoVehiculo?: IVehiculo;
}

export class DetalleEvento implements IDetalleEvento {
  constructor(
    public id?: number,
    public horaIngreso?: Moment,
    public horaEngreso?: Moment,
    public amigosevento?: IListaAmigos,
    public detallePersonaEvento?: IPersona,
    public detalleEventoVehiculo?: IVehiculo
  ) {}
}
