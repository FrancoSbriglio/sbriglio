import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DetalleEvento } from 'app/shared/model/detalle-evento.model';
import { DetalleEventoService } from './detalle-evento.service';
import { DetalleEventoComponent } from './detalle-evento.component';
import { DetalleEventoDetailComponent } from './detalle-evento-detail.component';
import { DetalleEventoUpdateComponent } from './detalle-evento-update.component';
import { DetalleEventoDeletePopupComponent } from './detalle-evento-delete-dialog.component';
import { IDetalleEvento } from 'app/shared/model/detalle-evento.model';

@Injectable({ providedIn: 'root' })
export class DetalleEventoResolve implements Resolve<IDetalleEvento> {
  constructor(private service: DetalleEventoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDetalleEvento> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DetalleEvento>) => response.ok),
        map((detalleEvento: HttpResponse<DetalleEvento>) => detalleEvento.body)
      );
    }
    return of(new DetalleEvento());
  }
}

export const detalleEventoRoute: Routes = [
  {
    path: '',
    component: DetalleEventoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleEventos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DetalleEventoDetailComponent,
    resolve: {
      detalleEvento: DetalleEventoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleEventos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DetalleEventoUpdateComponent,
    resolve: {
      detalleEvento: DetalleEventoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleEventos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DetalleEventoUpdateComponent,
    resolve: {
      detalleEvento: DetalleEventoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleEventos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const detalleEventoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DetalleEventoDeletePopupComponent,
    resolve: {
      detalleEvento: DetalleEventoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleEventos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
