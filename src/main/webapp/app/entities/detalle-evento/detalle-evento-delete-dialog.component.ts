import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDetalleEvento } from 'app/shared/model/detalle-evento.model';
import { DetalleEventoService } from './detalle-evento.service';

@Component({
  selector: 'jhi-detalle-evento-delete-dialog',
  templateUrl: './detalle-evento-delete-dialog.component.html'
})
export class DetalleEventoDeleteDialogComponent {
  detalleEvento: IDetalleEvento;

  constructor(
    protected detalleEventoService: DetalleEventoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.detalleEventoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'detalleEventoListModification',
        content: 'Deleted an detalleEvento'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-detalle-evento-delete-popup',
  template: ''
})
export class DetalleEventoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ detalleEvento }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DetalleEventoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.detalleEvento = detalleEvento;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/detalle-evento', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/detalle-evento', { outlets: { popup: null } }]);
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
