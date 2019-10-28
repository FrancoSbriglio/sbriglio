import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IModelo } from 'app/shared/model/modelo.model';
import { ModeloService } from './modelo.service';

@Component({
  selector: 'jhi-modelo-delete-dialog',
  templateUrl: './modelo-delete-dialog.component.html'
})
export class ModeloDeleteDialogComponent {
  modelo: IModelo;

  constructor(protected modeloService: ModeloService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.modeloService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'modeloListModification',
        content: 'Deleted an modelo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-modelo-delete-popup',
  template: ''
})
export class ModeloDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ modelo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ModeloDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.modelo = modelo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/modelo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/modelo', { outlets: { popup: null } }]);
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
