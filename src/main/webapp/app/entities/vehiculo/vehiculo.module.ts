import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { VehiculoComponent } from './vehiculo.component';
import { VehiculoDetailComponent } from './vehiculo-detail.component';
import { VehiculoUpdateComponent } from './vehiculo-update.component';
import { VehiculoDeletePopupComponent, VehiculoDeleteDialogComponent } from './vehiculo-delete-dialog.component';
import { vehiculoRoute, vehiculoPopupRoute } from './vehiculo.route';

const ENTITY_STATES = [...vehiculoRoute, ...vehiculoPopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    VehiculoComponent,
    VehiculoDetailComponent,
    VehiculoUpdateComponent,
    VehiculoDeleteDialogComponent,
    VehiculoDeletePopupComponent
  ],
  entryComponents: [VehiculoDeleteDialogComponent]
})
export class SbriglioVehiculoModule {}
