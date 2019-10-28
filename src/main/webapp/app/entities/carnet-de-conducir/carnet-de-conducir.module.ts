import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { CarnetDeConducirComponent } from './carnet-de-conducir.component';
import { CarnetDeConducirDetailComponent } from './carnet-de-conducir-detail.component';
import { CarnetDeConducirUpdateComponent } from './carnet-de-conducir-update.component';
import { CarnetDeConducirDeletePopupComponent, CarnetDeConducirDeleteDialogComponent } from './carnet-de-conducir-delete-dialog.component';
import { carnetDeConducirRoute, carnetDeConducirPopupRoute } from './carnet-de-conducir.route';

const ENTITY_STATES = [...carnetDeConducirRoute, ...carnetDeConducirPopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CarnetDeConducirComponent,
    CarnetDeConducirDetailComponent,
    CarnetDeConducirUpdateComponent,
    CarnetDeConducirDeleteDialogComponent,
    CarnetDeConducirDeletePopupComponent
  ],
  entryComponents: [CarnetDeConducirDeleteDialogComponent]
})
export class SbriglioCarnetDeConducirModule {}
