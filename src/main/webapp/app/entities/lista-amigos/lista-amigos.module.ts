import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { ListaAmigosComponent } from './lista-amigos.component';
import { ListaAmigosDetailComponent } from './lista-amigos-detail.component';
import { ListaAmigosUpdateComponent } from './lista-amigos-update.component';
import { ListaAmigosDeletePopupComponent, ListaAmigosDeleteDialogComponent } from './lista-amigos-delete-dialog.component';
import { listaAmigosRoute, listaAmigosPopupRoute } from './lista-amigos.route';

const ENTITY_STATES = [...listaAmigosRoute, ...listaAmigosPopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ListaAmigosComponent,
    ListaAmigosDetailComponent,
    ListaAmigosUpdateComponent,
    ListaAmigosDeleteDialogComponent,
    ListaAmigosDeletePopupComponent
  ],
  entryComponents: [ListaAmigosDeleteDialogComponent]
})
export class SbriglioListaAmigosModule {}
