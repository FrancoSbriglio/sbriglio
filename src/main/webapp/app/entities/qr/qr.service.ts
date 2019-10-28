import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IQR } from 'app/shared/model/qr.model';

type EntityResponseType = HttpResponse<IQR>;
type EntityArrayResponseType = HttpResponse<IQR[]>;

@Injectable({ providedIn: 'root' })
export class QRService {
  public resourceUrl = SERVER_API_URL + 'api/qrs';

  constructor(protected http: HttpClient) {}

  create(qR: IQR): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(qR);
    return this.http
      .post<IQR>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(qR: IQR): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(qR);
    return this.http
      .put<IQR>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IQR>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IQR[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(qR: IQR): IQR {
    const copy: IQR = Object.assign({}, qR, {
      fechaFinQR: qR.fechaFinQR != null && qR.fechaFinQR.isValid() ? qR.fechaFinQR.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaFinQR = res.body.fechaFinQR != null ? moment(res.body.fechaFinQR) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((qR: IQR) => {
        qR.fechaFinQR = qR.fechaFinQR != null ? moment(qR.fechaFinQR) : null;
      });
    }
    return res;
  }
}
