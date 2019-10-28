import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Marca } from 'app/shared/model/marca.model';
import { MarcaService } from './marca.service';
import { MarcaComponent } from './marca.component';
import { MarcaDetailComponent } from './marca-detail.component';
import { MarcaUpdateComponent } from './marca-update.component';
import { MarcaDeletePopupComponent } from './marca-delete-dialog.component';
import { IMarca } from 'app/shared/model/marca.model';

@Injectable({ providedIn: 'root' })
export class MarcaResolve implements Resolve<IMarca> {
  constructor(private service: MarcaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMarca> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Marca>) => response.ok),
        map((marca: HttpResponse<Marca>) => marca.body)
      );
    }
    return of(new Marca());
  }
}

export const marcaRoute: Routes = [
  {
    path: '',
    component: MarcaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Marcas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MarcaDetailComponent,
    resolve: {
      marca: MarcaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Marcas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MarcaUpdateComponent,
    resolve: {
      marca: MarcaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Marcas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MarcaUpdateComponent,
    resolve: {
      marca: MarcaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Marcas'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const marcaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MarcaDeletePopupComponent,
    resolve: {
      marca: MarcaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Marcas'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
