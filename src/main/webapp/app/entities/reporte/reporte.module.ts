import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SbriglioSharedModule } from 'app/shared/shared.module';
import { ReporteComponent } from './reporte.component';
import { ReporteDetailComponent } from './reporte-detail.component';
import { ReporteUpdateComponent } from './reporte-update.component';
import { ReporteDeletePopupComponent, ReporteDeleteDialogComponent } from './reporte-delete-dialog.component';
import { reporteRoute, reportePopupRoute } from './reporte.route';

const ENTITY_STATES = [...reporteRoute, ...reportePopupRoute];

@NgModule({
  imports: [SbriglioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ReporteComponent,
    ReporteDetailComponent,
    ReporteUpdateComponent,
    ReporteDeleteDialogComponent,
    ReporteDeletePopupComponent
  ],
  entryComponents: [ReporteDeleteDialogComponent]
})
export class SbriglioReporteModule {}
