import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IArt } from 'app/shared/model/art.model';
import { ArtService } from './art.service';

@Component({
  selector: 'jhi-art-delete-dialog',
  templateUrl: './art-delete-dialog.component.html'
})
export class ArtDeleteDialogComponent {
  art: IArt;

  constructor(protected artService: ArtService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.artService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'artListModification',
        content: 'Deleted an art'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-art-delete-popup',
  template: ''
})
export class ArtDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ art }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ArtDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.art = art;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/art', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/art', { outlets: { popup: null } }]);
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
