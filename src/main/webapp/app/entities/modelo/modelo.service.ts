import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IModelo } from 'app/shared/model/modelo.model';

type EntityResponseType = HttpResponse<IModelo>;
type EntityArrayResponseType = HttpResponse<IModelo[]>;

@Injectable({ providedIn: 'root' })
export class ModeloService {
  public resourceUrl = SERVER_API_URL + 'api/modelos';

  constructor(protected http: HttpClient) {}

  create(modelo: IModelo): Observable<EntityResponseType> {
    return this.http.post<IModelo>(this.resourceUrl, modelo, { observe: 'response' });
  }

  update(modelo: IModelo): Observable<EntityResponseType> {
    return this.http.put<IModelo>(this.resourceUrl, modelo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IModelo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IModelo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
