import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { DomicilioComponent } from './domicilio.component';
import { DomicilioDetailComponent } from './domicilio-detail.component';
import { DomicilioUpdateComponent } from './domicilio-update.component';
import { DomicilioDeletePopupComponent, DomicilioDeleteDialogComponent } from './domicilio-delete-dialog.component';
import { domicilioRoute, domicilioPopupRoute } from './domicilio.route';

const ENTITY_STATES = [...domicilioRoute, ...domicilioPopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DomicilioComponent,
    DomicilioDetailComponent,
    DomicilioUpdateComponent,
    DomicilioDeleteDialogComponent,
    DomicilioDeletePopupComponent
  ],
  entryComponents: [DomicilioDeleteDialogComponent]
})
export class SbriglioDomicilioModule {}
