import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CarnetDeConducir } from 'app/shared/model/carnet-de-conducir.model';
import { CarnetDeConducirService } from './carnet-de-conducir.service';
import { CarnetDeConducirComponent } from './carnet-de-conducir.component';
import { CarnetDeConducirDetailComponent } from './carnet-de-conducir-detail.component';
import { CarnetDeConducirUpdateComponent } from './carnet-de-conducir-update.component';
import { CarnetDeConducirDeletePopupComponent } from './carnet-de-conducir-delete-dialog.component';
import { ICarnetDeConducir } from 'app/shared/model/carnet-de-conducir.model';

@Injectable({ providedIn: 'root' })
export class CarnetDeConducirResolve implements Resolve<ICarnetDeConducir> {
  constructor(private service: CarnetDeConducirService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICarnetDeConducir> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CarnetDeConducir>) => response.ok),
        map((carnetDeConducir: HttpResponse<CarnetDeConducir>) => carnetDeConducir.body)
      );
    }
    return of(new CarnetDeConducir());
  }
}

export const carnetDeConducirRoute: Routes = [
  {
    path: '',
    component: CarnetDeConducirComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CarnetDeConducirs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CarnetDeConducirDetailComponent,
    resolve: {
      carnetDeConducir: CarnetDeConducirResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CarnetDeConducirs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CarnetDeConducirUpdateComponent,
    resolve: {
      carnetDeConducir: CarnetDeConducirResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CarnetDeConducirs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CarnetDeConducirUpdateComponent,
    resolve: {
      carnetDeConducir: CarnetDeConducirResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CarnetDeConducirs'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const carnetDeConducirPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CarnetDeConducirDeletePopupComponent,
    resolve: {
      carnetDeConducir: CarnetDeConducirResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CarnetDeConducirs'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
