import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBarrio } from 'app/shared/model/barrio.model';
import { BarrioService } from './barrio.service';

@Component({
  selector: 'jhi-barrio-delete-dialog',
  templateUrl: './barrio-delete-dialog.component.html'
})
export class BarrioDeleteDialogComponent {
  barrio: IBarrio;

  constructor(protected barrioService: BarrioService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.barrioService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'barrioListModification',
        content: 'Deleted an barrio'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-barrio-delete-popup',
  template: ''
})
export class BarrioDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ barrio }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(BarrioDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.barrio = barrio;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/barrio', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/barrio', { outlets: { popup: null } }]);
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
