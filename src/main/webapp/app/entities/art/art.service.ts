import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IArt } from 'app/shared/model/art.model';

type EntityResponseType = HttpResponse<IArt>;
type EntityArrayResponseType = HttpResponse<IArt[]>;

@Injectable({ providedIn: 'root' })
export class ArtService {
  public resourceUrl = SERVER_API_URL + 'api/arts';

  constructor(protected http: HttpClient) {}

  create(art: IArt): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(art);
    return this.http
      .post<IArt>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(art: IArt): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(art);
    return this.http
      .put<IArt>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IArt>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IArt[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(art: IArt): IArt {
    const copy: IArt = Object.assign({}, art, {
      fechaVencimientoArt: art.fechaVencimientoArt != null && art.fechaVencimientoArt.isValid() ? art.fechaVencimientoArt.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaVencimientoArt = res.body.fechaVencimientoArt != null ? moment(res.body.fechaVencimientoArt) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((art: IArt) => {
        art.fechaVencimientoArt = art.fechaVencimientoArt != null ? moment(art.fechaVencimientoArt) : null;
      });
    }
    return res;
  }
}
