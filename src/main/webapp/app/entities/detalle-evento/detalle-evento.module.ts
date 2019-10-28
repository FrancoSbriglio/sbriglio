import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { DetalleEventoComponent } from './detalle-evento.component';
import { DetalleEventoDetailComponent } from './detalle-evento-detail.component';
import { DetalleEventoUpdateComponent } from './detalle-evento-update.component';
import { DetalleEventoDeletePopupComponent, DetalleEventoDeleteDialogComponent } from './detalle-evento-delete-dialog.component';
import { detalleEventoRoute, detalleEventoPopupRoute } from './detalle-evento.route';

const ENTITY_STATES = [...detalleEventoRoute, ...detalleEventoPopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DetalleEventoComponent,
    DetalleEventoDetailComponent,
    DetalleEventoUpdateComponent,
    DetalleEventoDeleteDialogComponent,
    DetalleEventoDeletePopupComponent
  ],
  entryComponents: [DetalleEventoDeleteDialogComponent]
})
export class SbriglioDetalleEventoModule {}
