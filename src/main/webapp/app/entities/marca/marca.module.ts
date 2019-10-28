import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { MarcaComponent } from './marca.component';
import { MarcaDetailComponent } from './marca-detail.component';
import { MarcaUpdateComponent } from './marca-update.component';
import { MarcaDeletePopupComponent, MarcaDeleteDialogComponent } from './marca-delete-dialog.component';
import { marcaRoute, marcaPopupRoute } from './marca.route';

const ENTITY_STATES = [...marcaRoute, ...marcaPopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [MarcaComponent, MarcaDetailComponent, MarcaUpdateComponent, MarcaDeleteDialogComponent, MarcaDeletePopupComponent],
  entryComponents: [MarcaDeleteDialogComponent]
})
export class SbriglioMarcaModule {}
