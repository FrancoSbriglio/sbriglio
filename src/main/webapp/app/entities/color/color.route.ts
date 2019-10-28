import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Color } from 'app/shared/model/color.model';
import { ColorService } from './color.service';
import { ColorComponent } from './color.component';
import { ColorDetailComponent } from './color-detail.component';
import { ColorUpdateComponent } from './color-update.component';
import { ColorDeletePopupComponent } from './color-delete-dialog.component';
import { IColor } from 'app/shared/model/color.model';

@Injectable({ providedIn: 'root' })
export class ColorResolve implements Resolve<IColor> {
  constructor(private service: ColorService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IColor> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Color>) => response.ok),
        map((color: HttpResponse<Color>) => color.body)
      );
    }
    return of(new Color());
  }
}

export const colorRoute: Routes = [
  {
    path: '',
    component: ColorComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Colors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ColorDetailComponent,
    resolve: {
      color: ColorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Colors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ColorUpdateComponent,
    resolve: {
      color: ColorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Colors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ColorUpdateComponent,
    resolve: {
      color: ColorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Colors'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const colorPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ColorDeletePopupComponent,
    resolve: {
      color: ColorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Colors'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
