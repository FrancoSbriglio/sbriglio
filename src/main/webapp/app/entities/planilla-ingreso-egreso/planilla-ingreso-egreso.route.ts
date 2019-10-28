import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PlanillaIngresoEgreso } from 'app/shared/model/planilla-ingreso-egreso.model';
import { PlanillaIngresoEgresoService } from './planilla-ingreso-egreso.service';
import { PlanillaIngresoEgresoComponent } from './planilla-ingreso-egreso.component';
import { PlanillaIngresoEgresoDetailComponent } from './planilla-ingreso-egreso-detail.component';
import { PlanillaIngresoEgresoUpdateComponent } from './planilla-ingreso-egreso-update.component';
import { PlanillaIngresoEgresoDeletePopupComponent } from './planilla-ingreso-egreso-delete-dialog.component';
import { IPlanillaIngresoEgreso } from 'app/shared/model/planilla-ingreso-egreso.model';

@Injectable({ providedIn: 'root' })
export class PlanillaIngresoEgresoResolve implements Resolve<IPlanillaIngresoEgreso> {
  constructor(private service: PlanillaIngresoEgresoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlanillaIngresoEgreso> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PlanillaIngresoEgreso>) => response.ok),
        map((planillaIngresoEgreso: HttpResponse<PlanillaIngresoEgreso>) => planillaIngresoEgreso.body)
      );
    }
    return of(new PlanillaIngresoEgreso());
  }
}

export const planillaIngresoEgresoRoute: Routes = [
  {
    path: '',
    component: PlanillaIngresoEgresoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlanillaIngresoEgresos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlanillaIngresoEgresoDetailComponent,
    resolve: {
      planillaIngresoEgreso: PlanillaIngresoEgresoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlanillaIngresoEgresos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlanillaIngresoEgresoUpdateComponent,
    resolve: {
      planillaIngresoEgreso: PlanillaIngresoEgresoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlanillaIngresoEgresos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlanillaIngresoEgresoUpdateComponent,
    resolve: {
      planillaIngresoEgreso: PlanillaIngresoEgresoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlanillaIngresoEgresos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const planillaIngresoEgresoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PlanillaIngresoEgresoDeletePopupComponent,
    resolve: {
      planillaIngresoEgreso: PlanillaIngresoEgresoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PlanillaIngresoEgresos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
