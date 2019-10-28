import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Aseguradora } from 'app/shared/model/aseguradora.model';
import { AseguradoraService } from './aseguradora.service';
import { AseguradoraComponent } from './aseguradora.component';
import { AseguradoraDetailComponent } from './aseguradora-detail.component';
import { AseguradoraUpdateComponent } from './aseguradora-update.component';
import { AseguradoraDeletePopupComponent } from './aseguradora-delete-dialog.component';
import { IAseguradora } from 'app/shared/model/aseguradora.model';

@Injectable({ providedIn: 'root' })
export class AseguradoraResolve implements Resolve<IAseguradora> {
  constructor(private service: AseguradoraService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAseguradora> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Aseguradora>) => response.ok),
        map((aseguradora: HttpResponse<Aseguradora>) => aseguradora.body)
      );
    }
    return of(new Aseguradora());
  }
}

export const aseguradoraRoute: Routes = [
  {
    path: '',
    component: AseguradoraComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Aseguradoras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AseguradoraDetailComponent,
    resolve: {
      aseguradora: AseguradoraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Aseguradoras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AseguradoraUpdateComponent,
    resolve: {
      aseguradora: AseguradoraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Aseguradoras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AseguradoraUpdateComponent,
    resolve: {
      aseguradora: AseguradoraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Aseguradoras'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const aseguradoraPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AseguradoraDeletePopupComponent,
    resolve: {
      aseguradora: AseguradoraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Aseguradoras'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
