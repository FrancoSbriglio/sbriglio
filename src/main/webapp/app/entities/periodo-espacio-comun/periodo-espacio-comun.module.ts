import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { PeriodoEspacioComunComponent } from './periodo-espacio-comun.component';
import { PeriodoEspacioComunDetailComponent } from './periodo-espacio-comun-detail.component';
import { PeriodoEspacioComunUpdateComponent } from './periodo-espacio-comun-update.component';
import {
  PeriodoEspacioComunDeletePopupComponent,
  PeriodoEspacioComunDeleteDialogComponent
} from './periodo-espacio-comun-delete-dialog.component';
import { periodoEspacioComunRoute, periodoEspacioComunPopupRoute } from './periodo-espacio-comun.route';

const ENTITY_STATES = [...periodoEspacioComunRoute, ...periodoEspacioComunPopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PeriodoEspacioComunComponent,
    PeriodoEspacioComunDetailComponent,
    PeriodoEspacioComunUpdateComponent,
    PeriodoEspacioComunDeleteDialogComponent,
    PeriodoEspacioComunDeletePopupComponent
  ],
  entryComponents: [PeriodoEspacioComunDeleteDialogComponent]
})
export class SbriglioPeriodoEspacioComunModule {}
