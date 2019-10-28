import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QR } from 'app/shared/model/qr.model';
import { QRService } from './qr.service';
import { QRComponent } from './qr.component';
import { QRDetailComponent } from './qr-detail.component';
import { QRUpdateComponent } from './qr-update.component';
import { QRDeletePopupComponent } from './qr-delete-dialog.component';
import { IQR } from 'app/shared/model/qr.model';

@Injectable({ providedIn: 'root' })
export class QRResolve implements Resolve<IQR> {
  constructor(private service: QRService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IQR> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<QR>) => response.ok),
        map((qR: HttpResponse<QR>) => qR.body)
      );
    }
    return of(new QR());
  }
}

export const qRRoute: Routes = [
  {
    path: '',
    component: QRComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'QRS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: QRDetailComponent,
    resolve: {
      qR: QRResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'QRS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: QRUpdateComponent,
    resolve: {
      qR: QRResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'QRS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: QRUpdateComponent,
    resolve: {
      qR: QRResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'QRS'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const qRPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: QRDeletePopupComponent,
    resolve: {
      qR: QRResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'QRS'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
