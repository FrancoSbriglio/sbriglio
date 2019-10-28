import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDetalleEvento } from 'app/shared/model/detalle-evento.model';
import { AccountService } from 'app/core/auth/account.service';
import { DetalleEventoService } from './detalle-evento.service';

@Component({
  selector: 'jhi-detalle-evento',
  templateUrl: './detalle-evento.component.html'
})
export class DetalleEventoComponent implements OnInit, OnDestroy {
  detalleEventos: IDetalleEvento[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected detalleEventoService: DetalleEventoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.detalleEventoService
      .query()
      .pipe(
        filter((res: HttpResponse<IDetalleEvento[]>) => res.ok),
        map((res: HttpResponse<IDetalleEvento[]>) => res.body)
      )
      .subscribe(
        (res: IDetalleEvento[]) => {
          this.detalleEventos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDetalleEventos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDetalleEvento) {
    return item.id;
  }

  registerChangeInDetalleEventos() {
    this.eventSubscriber = this.eventManager.subscribe('detalleEventoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
