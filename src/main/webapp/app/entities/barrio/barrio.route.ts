import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Barrio } from 'app/shared/model/barrio.model';
import { BarrioService } from './barrio.service';
import { BarrioComponent } from './barrio.component';
import { BarrioDetailComponent } from './barrio-detail.component';
import { BarrioUpdateComponent } from './barrio-update.component';
import { BarrioDeletePopupComponent } from './barrio-delete-dialog.component';
import { IBarrio } from 'app/shared/model/barrio.model';

@Injectable({ providedIn: 'root' })
export class BarrioResolve implements Resolve<IBarrio> {
  constructor(private service: BarrioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBarrio> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Barrio>) => response.ok),
        map((barrio: HttpResponse<Barrio>) => barrio.body)
      );
    }
    return of(new Barrio());
  }
}

export const barrioRoute: Routes = [
  {
    path: '',
    component: BarrioComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Barrios'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BarrioDetailComponent,
    resolve: {
      barrio: BarrioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Barrios'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BarrioUpdateComponent,
    resolve: {
      barrio: BarrioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Barrios'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BarrioUpdateComponent,
    resolve: {
      barrio: BarrioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Barrios'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const barrioPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: BarrioDeletePopupComponent,
    resolve: {
      barrio: BarrioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Barrios'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
