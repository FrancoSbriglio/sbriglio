import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICarnetDeConducir } from 'app/shared/model/carnet-de-conducir.model';

type EntityResponseType = HttpResponse<ICarnetDeConducir>;
type EntityArrayResponseType = HttpResponse<ICarnetDeConducir[]>;

@Injectable({ providedIn: 'root' })
export class CarnetDeConducirService {
  public resourceUrl = SERVER_API_URL + 'api/carnet-de-conducirs';

  constructor(protected http: HttpClient) {}

  create(carnetDeConducir: ICarnetDeConducir): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(carnetDeConducir);
    return this.http
      .post<ICarnetDeConducir>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(carnetDeConducir: ICarnetDeConducir): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(carnetDeConducir);
    return this.http
      .put<ICarnetDeConducir>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICarnetDeConducir>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICarnetDeConducir[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(carnetDeConducir: ICarnetDeConducir): ICarnetDeConducir {
    const copy: ICarnetDeConducir = Object.assign({}, carnetDeConducir, {
      fechaOtorgamiento:
        carnetDeConducir.fechaOtorgamiento != null && carnetDeConducir.fechaOtorgamiento.isValid()
          ? carnetDeConducir.fechaOtorgamiento.toJSON()
          : null,
      fechaVencimiento:
        carnetDeConducir.fechaVencimiento != null && carnetDeConducir.fechaVencimiento.isValid()
          ? carnetDeConducir.fechaVencimiento.toJSON()
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaOtorgamiento = res.body.fechaOtorgamiento != null ? moment(res.body.fechaOtorgamiento) : null;
      res.body.fechaVencimiento = res.body.fechaVencimiento != null ? moment(res.body.fechaVencimiento) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((carnetDeConducir: ICarnetDeConducir) => {
        carnetDeConducir.fechaOtorgamiento = carnetDeConducir.fechaOtorgamiento != null ? moment(carnetDeConducir.fechaOtorgamiento) : null;
        carnetDeConducir.fechaVencimiento = carnetDeConducir.fechaVencimiento != null ? moment(carnetDeConducir.fechaVencimiento) : null;
      });
    }
    return res;
  }
}
