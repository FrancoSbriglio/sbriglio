import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMarca } from 'app/shared/model/marca.model';
import { MarcaService } from './marca.service';

@Component({
  selector: 'jhi-marca-delete-dialog',
  templateUrl: './marca-delete-dialog.component.html'
})
export class MarcaDeleteDialogComponent {
  marca: IMarca;

  constructor(protected marcaService: MarcaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.marcaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'marcaListModification',
        content: 'Deleted an marca'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-marca-delete-popup',
  template: ''
})
export class MarcaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ marca }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MarcaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.marca = marca;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/marca', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/marca', { outlets: { popup: null } }]);
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
