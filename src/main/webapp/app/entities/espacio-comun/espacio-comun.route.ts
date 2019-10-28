import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EspacioComun } from 'app/shared/model/espacio-comun.model';
import { EspacioComunService } from './espacio-comun.service';
import { EspacioComunComponent } from './espacio-comun.component';
import { EspacioComunDetailComponent } from './espacio-comun-detail.component';
import { EspacioComunUpdateComponent } from './espacio-comun-update.component';
import { EspacioComunDeletePopupComponent } from './espacio-comun-delete-dialog.component';
import { IEspacioComun } from 'app/shared/model/espacio-comun.model';

@Injectable({ providedIn: 'root' })
export class EspacioComunResolve implements Resolve<IEspacioComun> {
  constructor(private service: EspacioComunService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEspacioComun> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EspacioComun>) => response.ok),
        map((espacioComun: HttpResponse<EspacioComun>) => espacioComun.body)
      );
    }
    return of(new EspacioComun());
  }
}

export const espacioComunRoute: Routes = [
  {
    path: '',
    component: EspacioComunComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EspacioComuns'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EspacioComunDetailComponent,
    resolve: {
      espacioComun: EspacioComunResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EspacioComuns'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EspacioComunUpdateComponent,
    resolve: {
      espacioComun: EspacioComunResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EspacioComuns'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EspacioComunUpdateComponent,
    resolve: {
      espacioComun: EspacioComunResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EspacioComuns'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const espacioComunPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EspacioComunDeletePopupComponent,
    resolve: {
      espacioComun: EspacioComunResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EspacioComuns'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
