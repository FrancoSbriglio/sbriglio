import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EstadoPersona } from 'app/shared/model/estado-persona.model';
import { EstadoPersonaService } from './estado-persona.service';
import { EstadoPersonaComponent } from './estado-persona.component';
import { EstadoPersonaDetailComponent } from './estado-persona-detail.component';
import { EstadoPersonaUpdateComponent } from './estado-persona-update.component';
import { EstadoPersonaDeletePopupComponent } from './estado-persona-delete-dialog.component';
import { IEstadoPersona } from 'app/shared/model/estado-persona.model';

@Injectable({ providedIn: 'root' })
export class EstadoPersonaResolve implements Resolve<IEstadoPersona> {
  constructor(private service: EstadoPersonaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEstadoPersona> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EstadoPersona>) => response.ok),
        map((estadoPersona: HttpResponse<EstadoPersona>) => estadoPersona.body)
      );
    }
    return of(new EstadoPersona());
  }
}

export const estadoPersonaRoute: Routes = [
  {
    path: '',
    component: EstadoPersonaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoPersonas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EstadoPersonaDetailComponent,
    resolve: {
      estadoPersona: EstadoPersonaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoPersonas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EstadoPersonaUpdateComponent,
    resolve: {
      estadoPersona: EstadoPersonaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoPersonas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EstadoPersonaUpdateComponent,
    resolve: {
      estadoPersona: EstadoPersonaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoPersonas'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const estadoPersonaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EstadoPersonaDeletePopupComponent,
    resolve: {
      estadoPersona: EstadoPersonaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoPersonas'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
