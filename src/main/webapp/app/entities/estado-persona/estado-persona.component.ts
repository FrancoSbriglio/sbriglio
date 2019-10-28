import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstadoPersona } from 'app/shared/model/estado-persona.model';
import { AccountService } from 'app/core/auth/account.service';
import { EstadoPersonaService } from './estado-persona.service';

@Component({
  selector: 'jhi-estado-persona',
  templateUrl: './estado-persona.component.html'
})
export class EstadoPersonaComponent implements OnInit, OnDestroy {
  estadoPersonas: IEstadoPersona[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected estadoPersonaService: EstadoPersonaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.estadoPersonaService
      .query()
      .pipe(
        filter((res: HttpResponse<IEstadoPersona[]>) => res.ok),
        map((res: HttpResponse<IEstadoPersona[]>) => res.body)
      )
      .subscribe(
        (res: IEstadoPersona[]) => {
          this.estadoPersonas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEstadoPersonas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEstadoPersona) {
    return item.id;
  }

  registerChangeInEstadoPersonas() {
    this.eventSubscriber = this.eventManager.subscribe('estadoPersonaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
