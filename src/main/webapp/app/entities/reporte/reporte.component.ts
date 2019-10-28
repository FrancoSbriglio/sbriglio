import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReporte } from 'app/shared/model/reporte.model';
import { AccountService } from 'app/core/auth/account.service';
import { ReporteService } from './reporte.service';

@Component({
  selector: 'jhi-reporte',
  templateUrl: './reporte.component.html'
})
export class ReporteComponent implements OnInit, OnDestroy {
  reportes: IReporte[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected reporteService: ReporteService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.reporteService
      .query()
      .pipe(
        filter((res: HttpResponse<IReporte[]>) => res.ok),
        map((res: HttpResponse<IReporte[]>) => res.body)
      )
      .subscribe(
        (res: IReporte[]) => {
          this.reportes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInReportes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IReporte) {
    return item.id;
  }

  registerChangeInReportes() {
    this.eventSubscriber = this.eventManager.subscribe('reporteListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
