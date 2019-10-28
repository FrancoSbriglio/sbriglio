export interface INormaBarrio {
  id?: number;
  titulonorma?: string;
  descripcionnorma?: string;
}

export class NormaBarrio implements INormaBarrio {
  constructor(public id?: number, public titulonorma?: string, public descripcionnorma?: string) {}
}
