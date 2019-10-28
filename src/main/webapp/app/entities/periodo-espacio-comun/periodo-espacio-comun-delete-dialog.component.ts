import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPeriodoEspacioComun } from 'app/shared/model/periodo-espacio-comun.model';
import { PeriodoEspacioComunService } from './periodo-espacio-comun.service';

@Component({
  selector: 'jhi-periodo-espacio-comun-delete-dialog',
  templateUrl: './periodo-espacio-comun-delete-dialog.component.html'
})
export class PeriodoEspacioComunDeleteDialogComponent {
  periodoEspacioComun: IPeriodoEspacioComun;

  constructor(
    protected periodoEspacioComunService: PeriodoEspacioComunService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.periodoEspacioComunService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'periodoEspacioComunListModification',
        content: 'Deleted an periodoEspacioComun'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-periodo-espacio-comun-delete-popup',
  template: ''
})
export class PeriodoEspacioComunDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ periodoEspacioComun }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PeriodoEspacioComunDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.periodoEspacioComun = periodoEspacioComun;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/periodo-espacio-comun', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/periodo-espacio-comun', { outlets: { popup: null } }]);
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
