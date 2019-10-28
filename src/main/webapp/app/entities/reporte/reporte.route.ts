import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Reporte } from 'app/shared/model/reporte.model';
import { ReporteService } from './reporte.service';
import { ReporteComponent } from './reporte.component';
import { ReporteDetailComponent } from './reporte-detail.component';
import { ReporteUpdateComponent } from './reporte-update.component';
import { ReporteDeletePopupComponent } from './reporte-delete-dialog.component';
import { IReporte } from 'app/shared/model/reporte.model';

@Injectable({ providedIn: 'root' })
export class ReporteResolve implements Resolve<IReporte> {
  constructor(private service: ReporteService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReporte> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Reporte>) => response.ok),
        map((reporte: HttpResponse<Reporte>) => reporte.body)
      );
    }
    return of(new Reporte());
  }
}

export const reporteRoute: Routes = [
  {
    path: '',
    component: ReporteComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Reportes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ReporteDetailComponent,
    resolve: {
      reporte: ReporteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Reportes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ReporteUpdateComponent,
    resolve: {
      reporte: ReporteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Reportes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ReporteUpdateComponent,
    resolve: {
      reporte: ReporteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Reportes'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const reportePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ReporteDeletePopupComponent,
    resolve: {
      reporte: ReporteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Reportes'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
