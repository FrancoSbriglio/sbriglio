import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { EventoComponent } from './evento.component';
import { EventoDetailComponent } from './evento-detail.component';
import { EventoUpdateComponent } from './evento-update.component';
import { EventoDeletePopupComponent, EventoDeleteDialogComponent } from './evento-delete-dialog.component';
import { eventoRoute, eventoPopupRoute } from './evento.route';

const ENTITY_STATES = [...eventoRoute, ...eventoPopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [EventoComponent, EventoDetailComponent, EventoUpdateComponent, EventoDeleteDialogComponent, EventoDeletePopupComponent],
  entryComponents: [EventoDeleteDialogComponent]
})
export class SbriglioEventoModule {}
