import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { EstadoEventoComponent } from './estado-evento.component';
import { EstadoEventoDetailComponent } from './estado-evento-detail.component';
import { EstadoEventoUpdateComponent } from './estado-evento-update.component';
import { EstadoEventoDeletePopupComponent, EstadoEventoDeleteDialogComponent } from './estado-evento-delete-dialog.component';
import { estadoEventoRoute, estadoEventoPopupRoute } from './estado-evento.route';

const ENTITY_STATES = [...estadoEventoRoute, ...estadoEventoPopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EstadoEventoComponent,
    EstadoEventoDetailComponent,
    EstadoEventoUpdateComponent,
    EstadoEventoDeleteDialogComponent,
    EstadoEventoDeletePopupComponent
  ],
  entryComponents: [EstadoEventoDeleteDialogComponent]
})
export class SbriglioEstadoEventoModule {}
