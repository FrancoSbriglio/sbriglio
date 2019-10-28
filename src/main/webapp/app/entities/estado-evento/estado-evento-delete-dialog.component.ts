import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstadoEvento } from 'app/shared/model/estado-evento.model';
import { EstadoEventoService } from './estado-evento.service';

@Component({
  selector: 'jhi-estado-evento-delete-dialog',
  templateUrl: './estado-evento-delete-dialog.component.html'
})
export class EstadoEventoDeleteDialogComponent {
  estadoEvento: IEstadoEvento;

  constructor(
    protected estadoEventoService: EstadoEventoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.estadoEventoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'estadoEventoListModification',
        content: 'Deleted an estadoEvento'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-estado-evento-delete-popup',
  template: ''
})
export class EstadoEventoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ estadoEvento }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EstadoEventoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.estadoEvento = estadoEvento;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/estado-evento', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/estado-evento', { outlets: { popup: null } }]);
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
