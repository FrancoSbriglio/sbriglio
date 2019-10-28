import { IModelo } from 'app/shared/model/modelo.model';

export interface IMarca {
  id?: number;
  nombreMarca?: string;
  modelos?: IModelo[];
}

export class Marca implements IMarca {
  constructor(public id?: number, public nombreMarca?: string, public modelos?: IModelo[]) {}
}
