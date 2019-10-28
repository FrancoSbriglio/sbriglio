import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMensaje } from 'app/shared/model/mensaje.model';
import { AccountService } from 'app/core/auth/account.service';
import { MensajeService } from './mensaje.service';

@Component({
  selector: 'jhi-mensaje',
  templateUrl: './mensaje.component.html'
})
export class MensajeComponent implements OnInit, OnDestroy {
  mensajes: IMensaje[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected mensajeService: MensajeService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.mensajeService
      .query()
      .pipe(
        filter((res: HttpResponse<IMensaje[]>) => res.ok),
        map((res: HttpResponse<IMensaje[]>) => res.body)
      )
      .subscribe(
        (res: IMensaje[]) => {
          this.mensajes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMensajes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMensaje) {
    return item.id;
  }

  registerChangeInMensajes() {
    this.eventSubscriber = this.eventManager.subscribe('mensajeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
