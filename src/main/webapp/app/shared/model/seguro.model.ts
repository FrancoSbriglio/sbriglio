import { Moment } from 'moment';
import { IVehiculo } from 'app/shared/model/vehiculo.model';
import { IAseguradora } from 'app/shared/model/aseguradora.model';

export interface ISeguro {
  id?: number;
  fechaVencimientoSeguro?: Moment;
  seguroVehiculo?: IVehiculo;
  seguroAseguradora?: IAseguradora;
}

export class Seguro implements ISeguro {
  constructor(
    public id?: number,
    public fechaVencimientoSeguro?: Moment,
    public seguroVehiculo?: IVehiculo,
    public seguroAseguradora?: IAseguradora
  ) {}
}
