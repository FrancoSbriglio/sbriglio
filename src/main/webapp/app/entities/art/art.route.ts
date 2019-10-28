import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Art } from 'app/shared/model/art.model';
import { ArtService } from './art.service';
import { ArtComponent } from './art.component';
import { ArtDetailComponent } from './art-detail.component';
import { ArtUpdateComponent } from './art-update.component';
import { ArtDeletePopupComponent } from './art-delete-dialog.component';
import { IArt } from 'app/shared/model/art.model';

@Injectable({ providedIn: 'root' })
export class ArtResolve implements Resolve<IArt> {
  constructor(private service: ArtService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArt> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Art>) => response.ok),
        map((art: HttpResponse<Art>) => art.body)
      );
    }
    return of(new Art());
  }
}

export const artRoute: Routes = [
  {
    path: '',
    component: ArtComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Arts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ArtDetailComponent,
    resolve: {
      art: ArtResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Arts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ArtUpdateComponent,
    resolve: {
      art: ArtResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Arts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ArtUpdateComponent,
    resolve: {
      art: ArtResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Arts'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const artPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ArtDeletePopupComponent,
    resolve: {
      art: ArtResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Arts'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
