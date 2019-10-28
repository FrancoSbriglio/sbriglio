import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQR } from 'app/shared/model/qr.model';
import { QRService } from './qr.service';

@Component({
  selector: 'jhi-qr-delete-dialog',
  templateUrl: './qr-delete-dialog.component.html'
})
export class QRDeleteDialogComponent {
  qR: IQR;

  constructor(protected qRService: QRService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.qRService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'qRListModification',
        content: 'Deleted an qR'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-qr-delete-popup',
  template: ''
})
export class QRDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ qR }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(QRDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.qR = qR;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/qr', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/qr', { outlets: { popup: null } }]);
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
