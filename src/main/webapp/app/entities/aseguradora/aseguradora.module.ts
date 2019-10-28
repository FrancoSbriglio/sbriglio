import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { AseguradoraComponent } from './aseguradora.component';
import { AseguradoraDetailComponent } from './aseguradora-detail.component';
import { AseguradoraUpdateComponent } from './aseguradora-update.component';
import { AseguradoraDeletePopupComponent, AseguradoraDeleteDialogComponent } from './aseguradora-delete-dialog.component';
import { aseguradoraRoute, aseguradoraPopupRoute } from './aseguradora.route';

const ENTITY_STATES = [...aseguradoraRoute, ...aseguradoraPopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AseguradoraComponent,
    AseguradoraDetailComponent,
    AseguradoraUpdateComponent,
    AseguradoraDeleteDialogComponent,
    AseguradoraDeletePopupComponent
  ],
  entryComponents: [AseguradoraDeleteDialogComponent]
})
export class SbriglioAseguradoraModule {}
