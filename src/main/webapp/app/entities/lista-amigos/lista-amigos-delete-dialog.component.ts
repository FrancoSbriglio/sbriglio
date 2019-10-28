import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IListaAmigos } from 'app/shared/model/lista-amigos.model';
import { ListaAmigosService } from './lista-amigos.service';

@Component({
  selector: 'jhi-lista-amigos-delete-dialog',
  templateUrl: './lista-amigos-delete-dialog.component.html'
})
export class ListaAmigosDeleteDialogComponent {
  listaAmigos: IListaAmigos;

  constructor(
    protected listaAmigosService: ListaAmigosService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.listaAmigosService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'listaAmigosListModification',
        content: 'Deleted an listaAmigos'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-lista-amigos-delete-popup',
  template: ''
})
export class ListaAmigosDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ listaAmigos }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ListaAmigosDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.listaAmigos = listaAmigos;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/lista-amigos', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/lista-amigos', { outlets: { popup: null } }]);
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
