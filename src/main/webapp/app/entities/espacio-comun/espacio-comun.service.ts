import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEspacioComun } from 'app/shared/model/espacio-comun.model';

type EntityResponseType = HttpResponse<IEspacioComun>;
type EntityArrayResponseType = HttpResponse<IEspacioComun[]>;

@Injectable({ providedIn: 'root' })
export class EspacioComunService {
  public resourceUrl = SERVER_API_URL + 'api/espacio-comuns';

  constructor(protected http: HttpClient) {}

  create(espacioComun: IEspacioComun): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(espacioComun);
    return this.http
      .post<IEspacioComun>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(espacioComun: IEspacioComun): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(espacioComun);
    return this.http
      .put<IEspacioComun>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEspacioComun>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEspacioComun[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(espacioComun: IEspacioComun): IEspacioComun {
    const copy: IEspacioComun = Object.assign({}, espacioComun, {
      disponibilidadDesde:
        espacioComun.disponibilidadDesde != null && espacioComun.disponibilidadDesde.isValid()
          ? espacioComun.disponibilidadDesde.toJSON()
          : null,
      disponibilidadHasta:
        espacioComun.disponibilidadHasta != null && espacioComun.disponibilidadHasta.isValid()
          ? espacioComun.disponibilidadHasta.toJSON()
          : null,
      horaDesde: espacioComun.horaDesde != null && espacioComun.horaDesde.isValid() ? espacioComun.horaDesde.toJSON() : null,
      horaHasta: espacioComun.horaHasta != null && espacioComun.horaHasta.isValid() ? espacioComun.horaHasta.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.disponibilidadDesde = res.body.disponibilidadDesde != null ? moment(res.body.disponibilidadDesde) : null;
      res.body.disponibilidadHasta = res.body.disponibilidadHasta != null ? moment(res.body.disponibilidadHasta) : null;
      res.body.horaDesde = res.body.horaDesde != null ? moment(res.body.horaDesde) : null;
      res.body.horaHasta = res.body.horaHasta != null ? moment(res.body.horaHasta) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((espacioComun: IEspacioComun) => {
        espacioComun.disponibilidadDesde = espacioComun.disponibilidadDesde != null ? moment(espacioComun.disponibilidadDesde) : null;
        espacioComun.disponibilidadHasta = espacioComun.disponibilidadHasta != null ? moment(espacioComun.disponibilidadHasta) : null;
        espacioComun.horaDesde = espacioComun.horaDesde != null ? moment(espacioComun.horaDesde) : null;
        espacioComun.horaHasta = espacioComun.horaHasta != null ? moment(espacioComun.horaHasta) : null;
      });
    }
    return res;
  }
}
