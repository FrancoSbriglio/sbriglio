import { INormaBarrio } from 'app/shared/model/norma-barrio.model';

export interface IBarrio {
  id?: number;
  nombreBarrio?: string;
  cuitBarrio?: number;
  barrioNorma?: INormaBarrio;
}

export class Barrio implements IBarrio {
  constructor(public id?: number, public nombreBarrio?: string, public cuitBarrio?: number, public barrioNorma?: INormaBarrio) {}
}
