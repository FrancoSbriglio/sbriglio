import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

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
    const copy = this.convertDateFromClient(estadoPersona);
    return this.http
      .post<IEstadoPersona>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(estadoPersona: IEstadoPersona): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(estadoPersona);
    return this.http
      .put<IEstadoPersona>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEstadoPersona>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEstadoPersona[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(estadoPersona: IEstadoPersona): IEstadoPersona {
    const copy: IEstadoPersona = Object.assign({}, estadoPersona, {
      fecha: estadoPersona.fecha != null && estadoPersona.fecha.isValid() ? estadoPersona.fecha.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha != null ? moment(res.body.fecha) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((estadoPersona: IEstadoPersona) => {
        estadoPersona.fecha = estadoPersona.fecha != null ? moment(estadoPersona.fecha) : null;
      });
    }
    return res;
  }
}
