import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstadoEvento } from 'app/shared/model/estado-evento.model';
import { AccountService } from 'app/core/auth/account.service';
import { EstadoEventoService } from './estado-evento.service';

@Component({
  selector: 'jhi-estado-evento',
  templateUrl: './estado-evento.component.html'
})
export class EstadoEventoComponent implements OnInit, OnDestroy {
  estadoEventos: IEstadoEvento[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected estadoEventoService: EstadoEventoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.estadoEventoService
      .query()
      .pipe(
        filter((res: HttpResponse<IEstadoEvento[]>) => res.ok),
        map((res: HttpResponse<IEstadoEvento[]>) => res.body)
      )
      .subscribe(
        (res: IEstadoEvento[]) => {
          this.estadoEventos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEstadoEventos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEstadoEvento) {
    return item.id;
  }

  registerChangeInEstadoEventos() {
    this.eventSubscriber = this.eventManager.subscribe('estadoEventoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
