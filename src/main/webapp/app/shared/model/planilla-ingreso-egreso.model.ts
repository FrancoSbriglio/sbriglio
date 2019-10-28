import { Moment } from 'moment';
import { IBarrio } from 'app/shared/model/barrio.model';
import { IPersona } from 'app/shared/model/persona.model';
import { IQR } from 'app/shared/model/qr.model';
import { IDomicilio } from 'app/shared/model/domicilio.model';
import { IVehiculo } from 'app/shared/model/vehiculo.model';
import { IEmpresa } from 'app/shared/model/empresa.model';

export interface IPlanillaIngresoEgreso {
  id?: number;
  autorizadoPrevio?: boolean;
  acompaniantes?: number;
  fechaIngreso?: Moment;
  fechaEgreso?: Moment;
  tipovisita?: string;
  ingresoAPie?: boolean;
  planillaBarrio?: IBarrio;
  planillaPersona?: IPersona;
  planillaQr?: IQR;
  planillaDestino?: IDomicilio;
  planillaVehiculo?: IVehiculo;
  planillaEmpresa?: IEmpresa;
  planillaAutorizador?: IPersona;
  planillaAcompaniantes?: IPersona[];
}

export class PlanillaIngresoEgreso implements IPlanillaIngresoEgreso {
  constructor(
    public id?: number,
    public autorizadoPrevio?: boolean,
    public acompaniantes?: number,
    public fechaIngreso?: Moment,
    public fechaEgreso?: Moment,
    public tipovisita?: string,
    public ingresoAPie?: boolean,
    public planillaBarrio?: IBarrio,
    public planillaPersona?: IPersona,
    public planillaQr?: IQR,
    public planillaDestino?: IDomicilio,
    public planillaVehiculo?: IVehiculo,
    public planillaEmpresa?: IEmpresa,
    public planillaAutorizador?: IPersona,
    public planillaAcompaniantes?: IPersona[]
  ) {
    this.autorizadoPrevio = this.autorizadoPrevio || false;
    this.ingresoAPie = this.ingresoAPie || false;
  }
}
