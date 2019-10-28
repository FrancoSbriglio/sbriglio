import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDomicilio } from 'app/shared/model/domicilio.model';

type EntityResponseType = HttpResponse<IDomicilio>;
type EntityArrayResponseType = HttpResponse<IDomicilio[]>;

@Injectable({ providedIn: 'root' })
export class DomicilioService {
  public resourceUrl = SERVER_API_URL + 'api/domicilios';

  constructor(protected http: HttpClient) {}

  create(domicilio: IDomicilio): Observable<EntityResponseType> {
    return this.http.post<IDomicilio>(this.resourceUrl, domicilio, { observe: 'response' });
  }

  update(domicilio: IDomicilio): Observable<EntityResponseType> {
    return this.http.put<IDomicilio>(this.resourceUrl, domicilio, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDomicilio>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDomicilio[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
