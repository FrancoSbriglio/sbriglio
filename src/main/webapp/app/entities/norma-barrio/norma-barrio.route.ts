import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NormaBarrio } from 'app/shared/model/norma-barrio.model';
import { NormaBarrioService } from './norma-barrio.service';
import { NormaBarrioComponent } from './norma-barrio.component';
import { NormaBarrioDetailComponent } from './norma-barrio-detail.component';
import { NormaBarrioUpdateComponent } from './norma-barrio-update.component';
import { NormaBarrioDeletePopupComponent } from './norma-barrio-delete-dialog.component';
import { INormaBarrio } from 'app/shared/model/norma-barrio.model';

@Injectable({ providedIn: 'root' })
export class NormaBarrioResolve implements Resolve<INormaBarrio> {
  constructor(private service: NormaBarrioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INormaBarrio> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<NormaBarrio>) => response.ok),
        map((normaBarrio: HttpResponse<NormaBarrio>) => normaBarrio.body)
      );
    }
    return of(new NormaBarrio());
  }
}

export const normaBarrioRoute: Routes = [
  {
    path: '',
    component: NormaBarrioComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NormaBarrios'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NormaBarrioDetailComponent,
    resolve: {
      normaBarrio: NormaBarrioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NormaBarrios'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NormaBarrioUpdateComponent,
    resolve: {
      normaBarrio: NormaBarrioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NormaBarrios'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NormaBarrioUpdateComponent,
    resolve: {
      normaBarrio: NormaBarrioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NormaBarrios'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const normaBarrioPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: NormaBarrioDeletePopupComponent,
    resolve: {
      normaBarrio: NormaBarrioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'NormaBarrios'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
