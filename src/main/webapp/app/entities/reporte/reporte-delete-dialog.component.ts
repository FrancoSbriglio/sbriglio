import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReporte } from 'app/shared/model/reporte.model';
import { ReporteService } from './reporte.service';

@Component({
  selector: 'jhi-reporte-delete-dialog',
  templateUrl: './reporte-delete-dialog.component.html'
})
export class ReporteDeleteDialogComponent {
  reporte: IReporte;

  constructor(protected reporteService: ReporteService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.reporteService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'reporteListModification',
        content: 'Deleted an reporte'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-reporte-delete-popup',
  template: ''
})
export class ReporteDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reporte }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ReporteDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.reporte = reporte;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/reporte', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/reporte', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
