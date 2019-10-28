import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDomicilio } from 'app/shared/model/domicilio.model';
import { AccountService } from 'app/core/auth/account.service';
import { DomicilioService } from './domicilio.service';

@Component({
  selector: 'jhi-domicilio',
  templateUrl: './domicilio.component.html'
})
export class DomicilioComponent implements OnInit, OnDestroy {
  domicilios: IDomicilio[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected domicilioService: DomicilioService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.domicilioService
      .query()
      .pipe(
        filter((res: HttpResponse<IDomicilio[]>) => res.ok),
        map((res: HttpResponse<IDomicilio[]>) => res.body)
      )
      .subscribe(
        (res: IDomicilio[]) => {
          this.domicilios = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDomicilios();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDomicilio) {
    return item.id;
  }

  registerChangeInDomicilios() {
    this.eventSubscriber = this.eventManager.subscribe('domicilioListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
