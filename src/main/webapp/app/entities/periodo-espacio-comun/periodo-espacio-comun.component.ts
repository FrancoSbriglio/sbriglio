import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPeriodoEspacioComun } from 'app/shared/model/periodo-espacio-comun.model';
import { AccountService } from 'app/core/auth/account.service';
import { PeriodoEspacioComunService } from './periodo-espacio-comun.service';

@Component({
  selector: 'jhi-periodo-espacio-comun',
  templateUrl: './periodo-espacio-comun.component.html'
})
export class PeriodoEspacioComunComponent implements OnInit, OnDestroy {
  periodoEspacioComuns: IPeriodoEspacioComun[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected periodoEspacioComunService: PeriodoEspacioComunService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.periodoEspacioComunService
      .query()
      .pipe(
        filter((res: HttpResponse<IPeriodoEspacioComun[]>) => res.ok),
        map((res: HttpResponse<IPeriodoEspacioComun[]>) => res.body)
      )
      .subscribe(
        (res: IPeriodoEspacioComun[]) => {
          this.periodoEspacioComuns = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPeriodoEspacioComuns();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPeriodoEspacioComun) {
    return item.id;
  }

  registerChangeInPeriodoEspacioComuns() {
    this.eventSubscriber = this.eventManager.subscribe('periodoEspacioComunListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
