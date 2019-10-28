import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVehiculo } from 'app/shared/model/vehiculo.model';

type EntityResponseType = HttpResponse<IVehiculo>;
type EntityArrayResponseType = HttpResponse<IVehiculo[]>;

@Injectable({ providedIn: 'root' })
export class VehiculoService {
  public resourceUrl = SERVER_API_URL + 'api/vehiculos';

  constructor(protected http: HttpClient) {}

  create(vehiculo: IVehiculo): Observable<EntityResponseType> {
    return this.http.post<IVehiculo>(this.resourceUrl, vehiculo, { observe: 'response' });
  }

  update(vehiculo: IVehiculo): Observable<EntityResponseType> {
    return this.http.put<IVehiculo>(this.resourceUrl, vehiculo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVehiculo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVehiculo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
