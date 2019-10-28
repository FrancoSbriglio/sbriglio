import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { SeguroComponent } from './seguro.component';
import { SeguroDetailComponent } from './seguro-detail.component';
import { SeguroUpdateComponent } from './seguro-update.component';
import { SeguroDeletePopupComponent, SeguroDeleteDialogComponent } from './seguro-delete-dialog.component';
import { seguroRoute, seguroPopupRoute } from './seguro.route';

const ENTITY_STATES = [...seguroRoute, ...seguroPopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [SeguroComponent, SeguroDetailComponent, SeguroUpdateComponent, SeguroDeleteDialogComponent, SeguroDeletePopupComponent],
  entryComponents: [SeguroDeleteDialogComponent]
})
export class SbriglioSeguroModule {}
