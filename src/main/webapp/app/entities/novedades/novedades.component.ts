import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INovedades } from 'app/shared/model/novedades.model';
import { AccountService } from 'app/core/auth/account.service';
import { NovedadesService } from './novedades.service';

@Component({
  selector: 'jhi-novedades',
  templateUrl: './novedades.component.html'
})
export class NovedadesComponent implements OnInit, OnDestroy {
  novedades: INovedades[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected novedadesService: NovedadesService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.novedadesService
      .query()
      .pipe(
        filter((res: HttpResponse<INovedades[]>) => res.ok),
        map((res: HttpResponse<INovedades[]>) => res.body)
      )
      .subscribe(
        (res: INovedades[]) => {
          this.novedades = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInNovedades();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: INovedades) {
    return item.id;
  }

  registerChangeInNovedades() {
    this.eventSubscriber = this.eventManager.subscribe('novedadesListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
