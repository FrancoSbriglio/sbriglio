import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISeguro } from 'app/shared/model/seguro.model';
import { AccountService } from 'app/core/auth/account.service';
import { SeguroService } from './seguro.service';

@Component({
  selector: 'jhi-seguro',
  templateUrl: './seguro.component.html'
})
export class SeguroComponent implements OnInit, OnDestroy {
  seguros: ISeguro[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected seguroService: SeguroService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.seguroService
      .query()
      .pipe(
        filter((res: HttpResponse<ISeguro[]>) => res.ok),
        map((res: HttpResponse<ISeguro[]>) => res.body)
      )
      .subscribe(
        (res: ISeguro[]) => {
          this.seguros = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSeguros();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISeguro) {
    return item.id;
  }

  registerChangeInSeguros() {
    this.eventSubscriber = this.eventManager.subscribe('seguroListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
