import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ListaAmigos } from 'app/shared/model/lista-amigos.model';
import { ListaAmigosService } from './lista-amigos.service';
import { ListaAmigosComponent } from './lista-amigos.component';
import { ListaAmigosDetailComponent } from './lista-amigos-detail.component';
import { ListaAmigosUpdateComponent } from './lista-amigos-update.component';
import { ListaAmigosDeletePopupComponent } from './lista-amigos-delete-dialog.component';
import { IListaAmigos } from 'app/shared/model/lista-amigos.model';

@Injectable({ providedIn: 'root' })
export class ListaAmigosResolve implements Resolve<IListaAmigos> {
  constructor(private service: ListaAmigosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IListaAmigos> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ListaAmigos>) => response.ok),
        map((listaAmigos: HttpResponse<ListaAmigos>) => listaAmigos.body)
      );
    }
    return of(new ListaAmigos());
  }
}

export const listaAmigosRoute: Routes = [
  {
    path: '',
    component: ListaAmigosComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ListaAmigos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ListaAmigosDetailComponent,
    resolve: {
      listaAmigos: ListaAmigosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ListaAmigos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ListaAmigosUpdateComponent,
    resolve: {
      listaAmigos: ListaAmigosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ListaAmigos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ListaAmigosUpdateComponent,
    resolve: {
      listaAmigos: ListaAmigosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ListaAmigos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const listaAmigosPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ListaAmigosDeletePopupComponent,
    resolve: {
      listaAmigos: ListaAmigosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ListaAmigos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
