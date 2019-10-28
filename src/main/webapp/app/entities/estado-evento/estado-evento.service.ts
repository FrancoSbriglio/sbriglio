import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEstadoEvento } from 'app/shared/model/estado-evento.model';

type EntityResponseType = HttpResponse<IEstadoEvento>;
type EntityArrayResponseType = HttpResponse<IEstadoEvento[]>;

@Injectable({ providedIn: 'root' })
export class EstadoEventoService {
  public resourceUrl = SERVER_API_URL + 'api/estado-eventos';

  constructor(protected http: HttpClient) {}

  create(estadoEvento: IEstadoEvento): Observable<EntityResponseType> {
    return this.http.post<IEstadoEvento>(this.resourceUrl, estadoEvento, { observe: 'response' });
  }

  update(estadoEvento: IEstadoEvento): Observable<EntityResponseType> {
    return this.http.put<IEstadoEvento>(this.resourceUrl, estadoEvento, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstadoEvento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEstadoEvento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
