import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { ModeloComponent } from './modelo.component';
import { ModeloDetailComponent } from './modelo-detail.component';
import { ModeloUpdateComponent } from './modelo-update.component';
import { ModeloDeletePopupComponent, ModeloDeleteDialogComponent } from './modelo-delete-dialog.component';
import { modeloRoute, modeloPopupRoute } from './modelo.route';

const ENTITY_STATES = [...modeloRoute, ...modeloPopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ModeloComponent, ModeloDetailComponent, ModeloUpdateComponent, ModeloDeleteDialogComponent, ModeloDeletePopupComponent],
  entryComponents: [ModeloDeleteDialogComponent]
})
export class SbriglioModeloModule {}
