import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICarnetDeConducir } from 'app/shared/model/carnet-de-conducir.model';
import { CarnetDeConducirService } from './carnet-de-conducir.service';

@Component({
  selector: 'jhi-carnet-de-conducir-delete-dialog',
  templateUrl: './carnet-de-conducir-delete-dialog.component.html'
})
export class CarnetDeConducirDeleteDialogComponent {
  carnetDeConducir: ICarnetDeConducir;

  constructor(
    protected carnetDeConducirService: CarnetDeConducirService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.carnetDeConducirService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'carnetDeConducirListModification',
        content: 'Deleted an carnetDeConducir'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-carnet-de-conducir-delete-popup',
  template: ''
})
export class CarnetDeConducirDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ carnetDeConducir }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CarnetDeConducirDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.carnetDeConducir = carnetDeConducir;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/carnet-de-conducir', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/carnet-de-conducir', { outlets: { popup: null } }]);
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
