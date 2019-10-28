import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { NormaBarrioComponent } from './norma-barrio.component';
import { NormaBarrioDetailComponent } from './norma-barrio-detail.component';
import { NormaBarrioUpdateComponent } from './norma-barrio-update.component';
import { NormaBarrioDeletePopupComponent, NormaBarrioDeleteDialogComponent } from './norma-barrio-delete-dialog.component';
import { normaBarrioRoute, normaBarrioPopupRoute } from './norma-barrio.route';

const ENTITY_STATES = [...normaBarrioRoute, ...normaBarrioPopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    NormaBarrioComponent,
    NormaBarrioDetailComponent,
    NormaBarrioUpdateComponent,
    NormaBarrioDeleteDialogComponent,
    NormaBarrioDeletePopupComponent
  ],
  entryComponents: [NormaBarrioDeleteDialogComponent]
})
export class SbriglioNormaBarrioModule {}
