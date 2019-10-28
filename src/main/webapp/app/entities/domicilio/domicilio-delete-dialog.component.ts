import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDomicilio } from 'app/shared/model/domicilio.model';
import { DomicilioService } from './domicilio.service';

@Component({
  selector: 'jhi-domicilio-delete-dialog',
  templateUrl: './domicilio-delete-dialog.component.html'
})
export class DomicilioDeleteDialogComponent {
  domicilio: IDomicilio;

  constructor(protected domicilioService: DomicilioService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.domicilioService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'domicilioListModification',
        content: 'Deleted an domicilio'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-domicilio-delete-popup',
  template: ''
})
export class DomicilioDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ domicilio }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DomicilioDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.domicilio = domicilio;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/domicilio', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/domicilio', { outlets: { popup: null } }]);
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
