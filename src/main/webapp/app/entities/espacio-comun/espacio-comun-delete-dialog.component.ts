import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEspacioComun } from 'app/shared/model/espacio-comun.model';
import { EspacioComunService } from './espacio-comun.service';

@Component({
  selector: 'jhi-espacio-comun-delete-dialog',
  templateUrl: './espacio-comun-delete-dialog.component.html'
})
export class EspacioComunDeleteDialogComponent {
  espacioComun: IEspacioComun;

  constructor(
    protected espacioComunService: EspacioComunService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.espacioComunService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'espacioComunListModification',
        content: 'Deleted an espacioComun'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-espacio-comun-delete-popup',
  template: ''
})
export class EspacioComunDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ espacioComun }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EspacioComunDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.espacioComun = espacioComun;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/espacio-comun', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/espacio-comun', { outlets: { popup: null } }]);
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
