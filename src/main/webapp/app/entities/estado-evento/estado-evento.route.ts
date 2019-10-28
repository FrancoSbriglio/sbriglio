import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EstadoEvento } from 'app/shared/model/estado-evento.model';
import { EstadoEventoService } from './estado-evento.service';
import { EstadoEventoComponent } from './estado-evento.component';
import { EstadoEventoDetailComponent } from './estado-evento-detail.component';
import { EstadoEventoUpdateComponent } from './estado-evento-update.component';
import { EstadoEventoDeletePopupComponent } from './estado-evento-delete-dialog.component';
import { IEstadoEvento } from 'app/shared/model/estado-evento.model';

@Injectable({ providedIn: 'root' })
export class EstadoEventoResolve implements Resolve<IEstadoEvento> {
  constructor(private service: EstadoEventoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEstadoEvento> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EstadoEvento>) => response.ok),
        map((estadoEvento: HttpResponse<EstadoEvento>) => estadoEvento.body)
      );
    }
    return of(new EstadoEvento());
  }
}

export const estadoEventoRoute: Routes = [
  {
    path: '',
    component: EstadoEventoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoEventos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EstadoEventoDetailComponent,
    resolve: {
      estadoEvento: EstadoEventoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoEventos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EstadoEventoUpdateComponent,
    resolve: {
      estadoEvento: EstadoEventoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoEventos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EstadoEventoUpdateComponent,
    resolve: {
      estadoEvento: EstadoEventoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoEventos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const estadoEventoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EstadoEventoDeletePopupComponent,
    resolve: {
      estadoEvento: EstadoEventoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoEventos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
