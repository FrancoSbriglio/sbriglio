import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { PlanillaIngresoEgresoComponent } from './planilla-ingreso-egreso.component';
import { PlanillaIngresoEgresoDetailComponent } from './planilla-ingreso-egreso-detail.component';
import { PlanillaIngresoEgresoUpdateComponent } from './planilla-ingreso-egreso-update.component';
import {
  PlanillaIngresoEgresoDeletePopupComponent,
  PlanillaIngresoEgresoDeleteDialogComponent
} from './planilla-ingreso-egreso-delete-dialog.component';
import { planillaIngresoEgresoRoute, planillaIngresoEgresoPopupRoute } from './planilla-ingreso-egreso.route';

const ENTITY_STATES = [...planillaIngresoEgresoRoute, ...planillaIngresoEgresoPopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlanillaIngresoEgresoComponent,
    PlanillaIngresoEgresoDetailComponent,
    PlanillaIngresoEgresoUpdateComponent,
    PlanillaIngresoEgresoDeleteDialogComponent,
    PlanillaIngresoEgresoDeletePopupComponent
  ],
  entryComponents: [PlanillaIngresoEgresoDeleteDialogComponent]
})
export class SbriglioPlanillaIngresoEgresoModule {}
