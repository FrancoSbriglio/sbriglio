import { IMarca } from 'app/shared/model/marca.model';
import { IModelo } from 'app/shared/model/modelo.model';
import { IColor } from 'app/shared/model/color.model';

export interface IVehiculo {
  id?: number;
  dominio?: string;
  vehiculoMarca?: IMarca;
  vehiculoModelo?: IModelo;
  vehiculoColor?: IColor;
}

export class Vehiculo implements IVehiculo {
  constructor(
    public id?: number,
    public dominio?: string,
    public vehiculoMarca?: IMarca,
    public vehiculoModelo?: IModelo,
    public vehiculoColor?: IColor
  ) {}
}
