import { IPersona } from 'app/shared/model/persona.model';

export interface IListaAmigos {
  id?: number;
  nombreListaAmigos?: string;
  pertenece?: IPersona;
  amigos?: IPersona[];
}

export class ListaAmigos implements IListaAmigos {
  constructor(public id?: number, public nombreListaAmigos?: string, public pertenece?: IPersona, public amigos?: IPersona[]) {}
}
