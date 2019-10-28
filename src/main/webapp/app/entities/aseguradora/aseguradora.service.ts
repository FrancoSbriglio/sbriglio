import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAseguradora } from 'app/shared/model/aseguradora.model';

type EntityResponseType = HttpResponse<IAseguradora>;
type EntityArrayResponseType = HttpResponse<IAseguradora[]>;

@Injectable({ providedIn: 'root' })
export class AseguradoraService {
  public resourceUrl = SERVER_API_URL + 'api/aseguradoras';

  constructor(protected http: HttpClient) {}

  create(aseguradora: IAseguradora): Observable<EntityResponseType> {
    return this.http.post<IAseguradora>(this.resourceUrl, aseguradora, { observe: 'response' });
  }

  update(aseguradora: IAseguradora): Observable<EntityResponseType> {
    return this.http.put<IAseguradora>(this.resourceUrl, aseguradora, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAseguradora>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAseguradora[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
