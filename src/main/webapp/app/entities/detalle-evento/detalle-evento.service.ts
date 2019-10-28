import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDetalleEvento } from 'app/shared/model/detalle-evento.model';

type EntityResponseType = HttpResponse<IDetalleEvento>;
type EntityArrayResponseType = HttpResponse<IDetalleEvento[]>;

@Injectable({ providedIn: 'root' })
export class DetalleEventoService {
  public resourceUrl = SERVER_API_URL + 'api/detalle-eventos';

  constructor(protected http: HttpClient) {}

  create(detalleEvento: IDetalleEvento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(detalleEvento);
    return this.http
      .post<IDetalleEvento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(detalleEvento: IDetalleEvento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(detalleEvento);
    return this.http
      .put<IDetalleEvento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDetalleEvento>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDetalleEvento[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(detalleEvento: IDetalleEvento): IDetalleEvento {
    const copy: IDetalleEvento = Object.assign({}, detalleEvento, {
      horaIngreso: detalleEvento.horaIngreso != null && detalleEvento.horaIngreso.isValid() ? detalleEvento.horaIngreso.toJSON() : null,
      horaEngreso: detalleEvento.horaEngreso != null && detalleEvento.horaEngreso.isValid() ? detalleEvento.horaEngreso.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.horaIngreso = res.body.horaIngreso != null ? moment(res.body.horaIngreso) : null;
      res.body.horaEngreso = res.body.horaEngreso != null ? moment(res.body.horaEngreso) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((detalleEvento: IDetalleEvento) => {
        detalleEvento.horaIngreso = detalleEvento.horaIngreso != null ? moment(detalleEvento.horaIngreso) : null;
        detalleEvento.horaEngreso = detalleEvento.horaEngreso != null ? moment(detalleEvento.horaEngreso) : null;
      });
    }
    return res;
  }
}
