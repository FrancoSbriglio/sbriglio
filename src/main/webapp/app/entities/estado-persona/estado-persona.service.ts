import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEstadoPersona } from 'app/shared/model/estado-persona.model';

type EntityResponseType = HttpResponse<IEstadoPersona>;
type EntityArrayResponseType = HttpResponse<IEstadoPersona[]>;

@Injectable({ providedIn: 'root' })
export class EstadoPersonaService {
  public resourceUrl = SERVER_API_URL + 'api/estado-personas';

  constructor(protected http: HttpClient) {}

  create(estadoPersona: IEstadoPersona): Observable<EntityResponseType> {
    return this.http.post<IEstadoPersona>(this.resourceUrl, estadoPersona, { observe: 'response' });
  }

  update(estadoPersona: IEstadoPersona): Observable<EntityResponseType> {
    return this.http.put<IEstadoPersona>(this.resourceUrl, estadoPersona, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstadoPersona>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEstadoPersona[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
