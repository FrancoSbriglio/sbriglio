import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAseguradora } from 'app/shared/model/aseguradora.model';
import { AseguradoraService } from './aseguradora.service';

@Component({
  selector: 'jhi-aseguradora-delete-dialog',
  templateUrl: './aseguradora-delete-dialog.component.html'
})
export class AseguradoraDeleteDialogComponent {
  aseguradora: IAseguradora;

  constructor(
    protected aseguradoraService: AseguradoraService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.aseguradoraService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'aseguradoraListModification',
        content: 'Deleted an aseguradora'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-aseguradora-delete-popup',
  template: ''
})
export class AseguradoraDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ aseguradora }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AseguradoraDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.aseguradora = aseguradora;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/aseguradora', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/aseguradora', { outlets: { popup: null } }]);
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
