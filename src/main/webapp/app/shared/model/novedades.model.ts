import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface INovedades {
  id?: number;
  fecha?: Moment;
  descripcion?: string;
  creada?: IUser;
}

export class Novedades implements INovedades {
  constructor(public id?: number, public fecha?: Moment, public descripcion?: string, public creada?: IUser) {}
}
