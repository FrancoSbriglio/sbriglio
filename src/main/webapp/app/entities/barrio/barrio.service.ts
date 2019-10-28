import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBarrio } from 'app/shared/model/barrio.model';

type EntityResponseType = HttpResponse<IBarrio>;
type EntityArrayResponseType = HttpResponse<IBarrio[]>;

@Injectable({ providedIn: 'root' })
export class BarrioService {
  public resourceUrl = SERVER_API_URL + 'api/barrios';

  constructor(protected http: HttpClient) {}

  create(barrio: IBarrio): Observable<EntityResponseType> {
    return this.http.post<IBarrio>(this.resourceUrl, barrio, { observe: 'response' });
  }

  update(barrio: IBarrio): Observable<EntityResponseType> {
    return this.http.put<IBarrio>(this.resourceUrl, barrio, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBarrio>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBarrio[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
