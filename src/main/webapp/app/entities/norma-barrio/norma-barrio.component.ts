import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INormaBarrio } from 'app/shared/model/norma-barrio.model';
import { AccountService } from 'app/core/auth/account.service';
import { NormaBarrioService } from './norma-barrio.service';

@Component({
  selector: 'jhi-norma-barrio',
  templateUrl: './norma-barrio.component.html'
})
export class NormaBarrioComponent implements OnInit, OnDestroy {
  normaBarrios: INormaBarrio[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected normaBarrioService: NormaBarrioService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.normaBarrioService
      .query()
      .pipe(
        filter((res: HttpResponse<INormaBarrio[]>) => res.ok),
        map((res: HttpResponse<INormaBarrio[]>) => res.body)
      )
      .subscribe(
        (res: INormaBarrio[]) => {
          this.normaBarrios = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInNormaBarrios();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: INormaBarrio) {
    return item.id;
  }

  registerChangeInNormaBarrios() {
    this.eventSubscriber = this.eventManager.subscribe('normaBarrioListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
