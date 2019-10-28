import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { ArtComponent } from './art.component';
import { ArtDetailComponent } from './art-detail.component';
import { ArtUpdateComponent } from './art-update.component';
import { ArtDeletePopupComponent, ArtDeleteDialogComponent } from './art-delete-dialog.component';
import { artRoute, artPopupRoute } from './art.route';

const ENTITY_STATES = [...artRoute, ...artPopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ArtComponent, ArtDetailComponent, ArtUpdateComponent, ArtDeleteDialogComponent, ArtDeletePopupComponent],
  entryComponents: [ArtDeleteDialogComponent]
})
export class SbriglioArtModule {}
