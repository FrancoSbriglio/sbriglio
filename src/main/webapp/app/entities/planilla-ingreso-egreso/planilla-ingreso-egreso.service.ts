import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPlanillaIngresoEgreso } from 'app/shared/model/planilla-ingreso-egreso.model';

type EntityResponseType = HttpResponse<IPlanillaIngresoEgreso>;
type EntityArrayResponseType = HttpResponse<IPlanillaIngresoEgreso[]>;

@Injectable({ providedIn: 'root' })
export class PlanillaIngresoEgresoService {
  public resourceUrl = SERVER_API_URL + 'api/planilla-ingreso-egresos';

  constructor(protected http: HttpClient) {}

  create(planillaIngresoEgreso: IPlanillaIngresoEgreso): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(planillaIngresoEgreso);
    return this.http
      .post<IPlanillaIngresoEgreso>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(planillaIngresoEgreso: IPlanillaIngresoEgreso): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(planillaIngresoEgreso);
    return this.http
      .put<IPlanillaIngresoEgreso>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPlanillaIngresoEgreso>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPlanillaIngresoEgreso[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(planillaIngresoEgreso: IPlanillaIngresoEgreso): IPlanillaIngresoEgreso {
    const copy: IPlanillaIngresoEgreso = Object.assign({}, planillaIngresoEgreso, {
      fechaIngreso:
        planillaIngresoEgreso.fechaIngreso != null && planillaIngresoEgreso.fechaIngreso.isValid()
          ? planillaIngresoEgreso.fechaIngreso.toJSON()
          : null,
      fechaEgreso:
        planillaIngresoEgreso.fechaEgreso != null && planillaIngresoEgreso.fechaEgreso.isValid()
          ? planillaIngresoEgreso.fechaEgreso.toJSON()
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaIngreso = res.body.fechaIngreso != null ? moment(res.body.fechaIngreso) : null;
      res.body.fechaEgreso = res.body.fechaEgreso != null ? moment(res.body.fechaEgreso) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((planillaIngresoEgreso: IPlanillaIngresoEgreso) => {
        planillaIngresoEgreso.fechaIngreso = planillaIngresoEgreso.fechaIngreso != null ? moment(planillaIngresoEgreso.fechaIngreso) : null;
        planillaIngresoEgreso.fechaEgreso = planillaIngresoEgreso.fechaEgreso != null ? moment(planillaIngresoEgreso.fechaEgreso) : null;
      });
    }
    return res;
  }
}
