import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { EspacioComunComponent } from './espacio-comun.component';
import { EspacioComunDetailComponent } from './espacio-comun-detail.component';
import { EspacioComunUpdateComponent } from './espacio-comun-update.component';
import { EspacioComunDeletePopupComponent, EspacioComunDeleteDialogComponent } from './espacio-comun-delete-dialog.component';
import { espacioComunRoute, espacioComunPopupRoute } from './espacio-comun.route';

const ENTITY_STATES = [...espacioComunRoute, ...espacioComunPopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EspacioComunComponent,
    EspacioComunDetailComponent,
    EspacioComunUpdateComponent,
    EspacioComunDeleteDialogComponent,
    EspacioComunDeletePopupComponent
  ],
  entryComponents: [EspacioComunDeleteDialogComponent]
})
export class SbriglioEspacioComunModule {}
