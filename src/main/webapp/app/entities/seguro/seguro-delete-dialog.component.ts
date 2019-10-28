import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISeguro } from 'app/shared/model/seguro.model';
import { SeguroService } from './seguro.service';

@Component({
  selector: 'jhi-seguro-delete-dialog',
  templateUrl: './seguro-delete-dialog.component.html'
})
export class SeguroDeleteDialogComponent {
  seguro: ISeguro;

  constructor(protected seguroService: SeguroService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.seguroService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'seguroListModification',
        content: 'Deleted an seguro'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-seguro-delete-popup',
  template: ''
})
export class SeguroDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ seguro }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SeguroDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.seguro = seguro;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/seguro', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/seguro', { outlets: { popup: null } }]);
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
