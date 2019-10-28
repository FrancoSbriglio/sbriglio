import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INormaBarrio } from 'app/shared/model/norma-barrio.model';
import { NormaBarrioService } from './norma-barrio.service';

@Component({
  selector: 'jhi-norma-barrio-delete-dialog',
  templateUrl: './norma-barrio-delete-dialog.component.html'
})
export class NormaBarrioDeleteDialogComponent {
  normaBarrio: INormaBarrio;

  constructor(
    protected normaBarrioService: NormaBarrioService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.normaBarrioService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'normaBarrioListModification',
        content: 'Deleted an normaBarrio'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-norma-barrio-delete-popup',
  template: ''
})
export class NormaBarrioDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ normaBarrio }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(NormaBarrioDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.normaBarrio = normaBarrio;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/norma-barrio', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/norma-barrio', { outlets: { popup: null } }]);
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
