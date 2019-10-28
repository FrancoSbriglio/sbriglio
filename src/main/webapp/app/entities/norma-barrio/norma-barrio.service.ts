import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INormaBarrio } from 'app/shared/model/norma-barrio.model';

type EntityResponseType = HttpResponse<INormaBarrio>;
type EntityArrayResponseType = HttpResponse<INormaBarrio[]>;

@Injectable({ providedIn: 'root' })
export class NormaBarrioService {
  public resourceUrl = SERVER_API_URL + 'api/norma-barrios';

  constructor(protected http: HttpClient) {}

  create(normaBarrio: INormaBarrio): Observable<EntityResponseType> {
    return this.http.post<INormaBarrio>(this.resourceUrl, normaBarrio, { observe: 'response' });
  }

  update(normaBarrio: INormaBarrio): Observable<EntityResponseType> {
    return this.http.put<INormaBarrio>(this.resourceUrl, normaBarrio, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INormaBarrio>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INormaBarrio[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
