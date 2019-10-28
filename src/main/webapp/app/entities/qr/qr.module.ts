import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { QRComponent } from './qr.component';
import { QRDetailComponent } from './qr-detail.component';
import { QRUpdateComponent } from './qr-update.component';
import { QRDeletePopupComponent, QRDeleteDialogComponent } from './qr-delete-dialog.component';
import { qRRoute, qRPopupRoute } from './qr.route';

const ENTITY_STATES = [...qRRoute, ...qRPopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [QRComponent, QRDetailComponent, QRUpdateComponent, QRDeleteDialogComponent, QRDeletePopupComponent],
  entryComponents: [QRDeleteDialogComponent]
})
export class SbriglioQRModule {}
