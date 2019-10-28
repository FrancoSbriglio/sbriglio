import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { EmpresaComponent } from './empresa.component';
import { EmpresaDetailComponent } from './empresa-detail.component';
import { EmpresaUpdateComponent } from './empresa-update.component';
import { EmpresaDeletePopupComponent, EmpresaDeleteDialogComponent } from './empresa-delete-dialog.component';
import { empresaRoute, empresaPopupRoute } from './empresa.route';

const ENTITY_STATES = [...empresaRoute, ...empresaPopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EmpresaComponent,
    EmpresaDetailComponent,
    EmpresaUpdateComponent,
    EmpresaDeleteDialogComponent,
    EmpresaDeletePopupComponent
  ],
  entryComponents: [EmpresaDeleteDialogComponent]
})
export class SbriglioEmpresaModule {}
