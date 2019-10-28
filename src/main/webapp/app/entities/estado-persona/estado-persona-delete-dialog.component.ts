import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstadoPersona } from 'app/shared/model/estado-persona.model';
import { EstadoPersonaService } from './estado-persona.service';

@Component({
  selector: 'jhi-estado-persona-delete-dialog',
  templateUrl: './estado-persona-delete-dialog.component.html'
})
export class EstadoPersonaDeleteDialogComponent {
  estadoPersona: IEstadoPersona;

  constructor(
    protected estadoPersonaService: EstadoPersonaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.estadoPersonaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'estadoPersonaListModification',
        content: 'Deleted an estadoPersona'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-estado-persona-delete-popup',
  template: ''
})
export class EstadoPersonaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ estadoPersona }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EstadoPersonaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.estadoPersona = estadoPersona;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/estado-persona', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/estado-persona', { outlets: { popup: null } }]);
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
