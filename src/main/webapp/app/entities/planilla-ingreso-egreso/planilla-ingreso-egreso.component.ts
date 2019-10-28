import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlanillaIngresoEgreso } from 'app/shared/model/planilla-ingreso-egreso.model';
import { AccountService } from 'app/core/auth/account.service';
import { PlanillaIngresoEgresoService } from './planilla-ingreso-egreso.service';

@Component({
  selector: 'jhi-planilla-ingreso-egreso',
  templateUrl: './planilla-ingreso-egreso.component.html'
})
export class PlanillaIngresoEgresoComponent implements OnInit, OnDestroy {
  planillaIngresoEgresos: IPlanillaIngresoEgreso[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected planillaIngresoEgresoService: PlanillaIngresoEgresoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.planillaIngresoEgresoService
      .query()
      .pipe(
        filter((res: HttpResponse<IPlanillaIngresoEgreso[]>) => res.ok),
        map((res: HttpResponse<IPlanillaIngresoEgreso[]>) => res.body)
      )
      .subscribe(
        (res: IPlanillaIngresoEgreso[]) => {
          this.planillaIngresoEgresos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPlanillaIngresoEgresos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPlanillaIngresoEgreso) {
    return item.id;
  }

  registerChangeInPlanillaIngresoEgresos() {
    this.eventSubscriber = this.eventManager.subscribe('planillaIngresoEgresoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
