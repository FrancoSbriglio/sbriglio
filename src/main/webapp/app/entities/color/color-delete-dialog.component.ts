import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IColor } from 'app/shared/model/color.model';
import { ColorService } from './color.service';

@Component({
  selector: 'jhi-color-delete-dialog',
  templateUrl: './color-delete-dialog.component.html'
})
export class ColorDeleteDialogComponent {
  color: IColor;

  constructor(protected colorService: ColorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.colorService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'colorListModification',
        content: 'Deleted an color'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-color-delete-popup',
  template: ''
})
export class ColorDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ color }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ColorDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.color = color;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/color', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/color', { outlets: { popup: null } }]);
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
