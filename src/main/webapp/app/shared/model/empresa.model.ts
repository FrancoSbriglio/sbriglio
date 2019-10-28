export interface IEmpresa {
  id?: number;
  nombreEmpresa?: string;
}

export class Empresa implements IEmpresa {
  constructor(public id?: number, public nombreEmpresa?: string) {}
}
