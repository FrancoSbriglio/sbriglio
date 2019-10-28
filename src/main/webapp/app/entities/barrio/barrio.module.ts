import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { BarrioComponent } from './barrio.component';
import { BarrioDetailComponent } from './barrio-detail.component';
import { BarrioUpdateComponent } from './barrio-update.component';
import { BarrioDeletePopupComponent, BarrioDeleteDialogComponent } from './barrio-delete-dialog.component';
import { barrioRoute, barrioPopupRoute } from './barrio.route';

const ENTITY_STATES = [...barrioRoute, ...barrioPopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [BarrioComponent, BarrioDetailComponent, BarrioUpdateComponent, BarrioDeleteDialogComponent, BarrioDeletePopupComponent],
  entryComponents: [BarrioDeleteDialogComponent]
})
export class SbriglioBarrioModule {}
