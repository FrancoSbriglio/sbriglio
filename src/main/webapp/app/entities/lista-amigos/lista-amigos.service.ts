import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IListaAmigos } from 'app/shared/model/lista-amigos.model';

type EntityResponseType = HttpResponse<IListaAmigos>;
type EntityArrayResponseType = HttpResponse<IListaAmigos[]>;

@Injectable({ providedIn: 'root' })
export class ListaAmigosService {
  public resourceUrl = SERVER_API_URL + 'api/lista-amigos';

  constructor(protected http: HttpClient) {}

  create(listaAmigos: IListaAmigos): Observable<EntityResponseType> {
    return this.http.post<IListaAmigos>(this.resourceUrl, listaAmigos, { observe: 'response' });
  }

  update(listaAmigos: IListaAmigos): Observable<EntityResponseType> {
    return this.http.put<IListaAmigos>(this.resourceUrl, listaAmigos, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IListaAmigos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IListaAmigos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
