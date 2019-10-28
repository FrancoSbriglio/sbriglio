import { IPersona } from 'app/shared/model/persona.model';

export interface IDomicilio {
  id?: number;
  casaDomicilio?: string;
  deptoDomicilio?: number;
  manzanaDomicilio?: string;
  pisoDomicilio?: number;
  domiciliopersonas?: IPersona[];
}

export class Domicilio implements IDomicilio {
  constructor(
    public id?: number,
    public casaDomicilio?: string,
    public deptoDomicilio?: number,
    public manzanaDomicilio?: string,
    public pisoDomicilio?: number,
    public domiciliopersonas?: IPersona[]
  ) {}
}
