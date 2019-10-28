import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISeguro } from 'app/shared/model/seguro.model';

type EntityResponseType = HttpResponse<ISeguro>;
type EntityArrayResponseType = HttpResponse<ISeguro[]>;

@Injectable({ providedIn: 'root' })
export class SeguroService {
  public resourceUrl = SERVER_API_URL + 'api/seguros';

  constructor(protected http: HttpClient) {}

  create(seguro: ISeguro): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(seguro);
    return this.http
      .post<ISeguro>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(seguro: ISeguro): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(seguro);
    return this.http
      .put<ISeguro>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISeguro>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISeguro[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(seguro: ISeguro): ISeguro {
    const copy: ISeguro = Object.assign({}, seguro, {
      fechaVencimientoSeguro:
        seguro.fechaVencimientoSeguro != null && seguro.fechaVencimientoSeguro.isValid() ? seguro.fechaVencimientoSeguro.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaVencimientoSeguro = res.body.fechaVencimientoSeguro != null ? moment(res.body.fechaVencimientoSeguro) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((seguro: ISeguro) => {
        seguro.fechaVencimientoSeguro = seguro.fechaVencimientoSeguro != null ? moment(seguro.fechaVencimientoSeguro) : null;
      });
    }
    return res;
  }
}
