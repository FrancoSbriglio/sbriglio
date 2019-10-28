import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IMensaje {
  id?: number;
  fechaHoraMensaje?: Moment;
  descripcionMensaje?: string;
  estadoMensaje?: string;
  userDestino?: IUser;
  userOrigen?: IUser;
}

export class Mensaje implements IMensaje {
  constructor(
    public id?: number,
    public fechaHoraMensaje?: Moment,
    public descripcionMensaje?: string,
    public estadoMensaje?: string,
    public userDestino?: IUser,
    public userOrigen?: IUser
  ) {}
}
