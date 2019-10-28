import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PeriodoEspacioComun } from 'app/shared/model/periodo-espacio-comun.model';
import { PeriodoEspacioComunService } from './periodo-espacio-comun.service';
import { PeriodoEspacioComunComponent } from './periodo-espacio-comun.component';
import { PeriodoEspacioComunDetailComponent } from './periodo-espacio-comun-detail.component';
import { PeriodoEspacioComunUpdateComponent } from './periodo-espacio-comun-update.component';
import { PeriodoEspacioComunDeletePopupComponent } from './periodo-espacio-comun-delete-dialog.component';
import { IPeriodoEspacioComun } from 'app/shared/model/periodo-espacio-comun.model';

@Injectable({ providedIn: 'root' })
export class PeriodoEspacioComunResolve implements Resolve<IPeriodoEspacioComun> {
  constructor(private service: PeriodoEspacioComunService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPeriodoEspacioComun> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PeriodoEspacioComun>) => response.ok),
        map((periodoEspacioComun: HttpResponse<PeriodoEspacioComun>) => periodoEspacioComun.body)
      );
    }
    return of(new PeriodoEspacioComun());
  }
}

export const periodoEspacioComunRoute: Routes = [
  {
    path: '',
    component: PeriodoEspacioComunComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PeriodoEspacioComuns'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PeriodoEspacioComunDetailComponent,
    resolve: {
      periodoEspacioComun: PeriodoEspacioComunResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PeriodoEspacioComuns'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PeriodoEspacioComunUpdateComponent,
    resolve: {
      periodoEspacioComun: PeriodoEspacioComunResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PeriodoEspacioComuns'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PeriodoEspacioComunUpdateComponent,
    resolve: {
      periodoEspacioComun: PeriodoEspacioComunResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PeriodoEspacioComuns'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const periodoEspacioComunPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PeriodoEspacioComunDeletePopupComponent,
    resolve: {
      periodoEspacioComun: PeriodoEspacioComunResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PeriodoEspacioComuns'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
