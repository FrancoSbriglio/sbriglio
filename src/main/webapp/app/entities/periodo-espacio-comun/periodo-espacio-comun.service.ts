import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPeriodoEspacioComun } from 'app/shared/model/periodo-espacio-comun.model';

type EntityResponseType = HttpResponse<IPeriodoEspacioComun>;
type EntityArrayResponseType = HttpResponse<IPeriodoEspacioComun[]>;

@Injectable({ providedIn: 'root' })
export class PeriodoEspacioComunService {
  public resourceUrl = SERVER_API_URL + 'api/periodo-espacio-comuns';

  constructor(protected http: HttpClient) {}

  create(periodoEspacioComun: IPeriodoEspacioComun): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(periodoEspacioComun);
    return this.http
      .post<IPeriodoEspacioComun>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(periodoEspacioComun: IPeriodoEspacioComun): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(periodoEspacioComun);
    return this.http
      .put<IPeriodoEspacioComun>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPeriodoEspacioComun>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPeriodoEspacioComun[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(periodoEspacioComun: IPeriodoEspacioComun): IPeriodoEspacioComun {
    const copy: IPeriodoEspacioComun = Object.assign({}, periodoEspacioComun, {
      periodo: periodoEspacioComun.periodo != null && periodoEspacioComun.periodo.isValid() ? periodoEspacioComun.periodo.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.periodo = res.body.periodo != null ? moment(res.body.periodo) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((periodoEspacioComun: IPeriodoEspacioComun) => {
        periodoEspacioComun.periodo = periodoEspacioComun.periodo != null ? moment(periodoEspacioComun.periodo) : null;
      });
    }
    return res;
  }
}
