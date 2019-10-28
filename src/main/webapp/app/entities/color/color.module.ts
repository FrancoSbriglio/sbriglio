import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { ColorComponent } from './color.component';
import { ColorDetailComponent } from './color-detail.component';
import { ColorUpdateComponent } from './color-update.component';
import { ColorDeletePopupComponent, ColorDeleteDialogComponent } from './color-delete-dialog.component';
import { colorRoute, colorPopupRoute } from './color.route';

const ENTITY_STATES = [...colorRoute, ...colorPopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ColorComponent, ColorDetailComponent, ColorUpdateComponent, ColorDeleteDialogComponent, ColorDeletePopupComponent],
  entryComponents: [ColorDeleteDialogComponent]
})
export class SbriglioColorModule {}
