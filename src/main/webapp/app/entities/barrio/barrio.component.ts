import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBarrio } from 'app/shared/model/barrio.model';
import { AccountService } from 'app/core/auth/account.service';
import { BarrioService } from './barrio.service';

@Component({
  selector: 'jhi-barrio',
  templateUrl: './barrio.component.html'
})
export class BarrioComponent implements OnInit, OnDestroy {
  barrios: IBarrio[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected barrioService: BarrioService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.barrioService
      .query()
      .pipe(
        filter((res: HttpResponse<IBarrio[]>) => res.ok),
        map((res: HttpResponse<IBarrio[]>) => res.body)
      )
      .subscribe(
        (res: IBarrio[]) => {
          this.barrios = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInBarrios();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBarrio) {
    return item.id;
  }

  registerChangeInBarrios() {
    this.eventSubscriber = this.eventManager.subscribe('barrioListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
