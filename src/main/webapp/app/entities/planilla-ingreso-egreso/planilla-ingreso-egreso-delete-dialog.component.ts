import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlanillaIngresoEgreso } from 'app/shared/model/planilla-ingreso-egreso.model';
import { PlanillaIngresoEgresoService } from './planilla-ingreso-egreso.service';

@Component({
  selector: 'jhi-planilla-ingreso-egreso-delete-dialog',
  templateUrl: './planilla-ingreso-egreso-delete-dialog.component.html'
})
export class PlanillaIngresoEgresoDeleteDialogComponent {
  planillaIngresoEgreso: IPlanillaIngresoEgreso;

  constructor(
    protected planillaIngresoEgresoService: PlanillaIngresoEgresoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.planillaIngresoEgresoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'planillaIngresoEgresoListModification',
        content: 'Deleted an planillaIngresoEgreso'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-planilla-ingreso-egreso-delete-popup',
  template: ''
})
export class PlanillaIngresoEgresoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ planillaIngresoEgreso }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PlanillaIngresoEgresoDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.planillaIngresoEgreso = planillaIngresoEgreso;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/planilla-ingreso-egreso', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/planilla-ingreso-egreso', { outlets: { popup: null } }]);
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
