import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Seguro } from 'app/shared/model/seguro.model';
import { SeguroService } from './seguro.service';
import { SeguroComponent } from './seguro.component';
import { SeguroDetailComponent } from './seguro-detail.component';
import { SeguroUpdateComponent } from './seguro-update.component';
import { SeguroDeletePopupComponent } from './seguro-delete-dialog.component';
import { ISeguro } from 'app/shared/model/seguro.model';

@Injectable({ providedIn: 'root' })
export class SeguroResolve implements Resolve<ISeguro> {
  constructor(private service: SeguroService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISeguro> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Seguro>) => response.ok),
        map((seguro: HttpResponse<Seguro>) => seguro.body)
      );
    }
    return of(new Seguro());
  }
}

export const seguroRoute: Routes = [
  {
    path: '',
    component: SeguroComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Seguros'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SeguroDetailComponent,
    resolve: {
      seguro: SeguroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Seguros'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SeguroUpdateComponent,
    resolve: {
      seguro: SeguroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Seguros'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SeguroUpdateComponent,
    resolve: {
      seguro: SeguroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Seguros'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const seguroPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SeguroDeletePopupComponent,
    resolve: {
      seguro: SeguroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Seguros'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
