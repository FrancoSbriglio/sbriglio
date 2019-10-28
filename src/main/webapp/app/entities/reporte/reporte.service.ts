import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IReporte } from 'app/shared/model/reporte.model';

type EntityResponseType = HttpResponse<IReporte>;
type EntityArrayResponseType = HttpResponse<IReporte[]>;

@Injectable({ providedIn: 'root' })
export class ReporteService {
  public resourceUrl = SERVER_API_URL + 'api/reportes';

  constructor(protected http: HttpClient) {}

  create(reporte: IReporte): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reporte);
    return this.http
      .post<IReporte>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reporte: IReporte): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reporte);
    return this.http
      .put<IReporte>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReporte>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReporte[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(reporte: IReporte): IReporte {
    const copy: IReporte = Object.assign({}, reporte, {
      fecha: reporte.fecha != null && reporte.fecha.isValid() ? reporte.fecha.toJSON() : null
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
      res.body.forEach((reporte: IReporte) => {
        reporte.fecha = reporte.fecha != null ? moment(reporte.fecha) : null;
      });
    }
    return res;
  }
}
