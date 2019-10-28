import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IQR } from 'app/shared/model/qr.model';
import { AccountService } from 'app/core/auth/account.service';
import { QRService } from './qr.service';

@Component({
  selector: 'jhi-qr',
  templateUrl: './qr.component.html'
})
export class QRComponent implements OnInit, OnDestroy {
  qRS: IQR[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected qRService: QRService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.qRService
      .query()
      .pipe(
        filter((res: HttpResponse<IQR[]>) => res.ok),
        map((res: HttpResponse<IQR[]>) => res.body)
      )
      .subscribe(
        (res: IQR[]) => {
          this.qRS = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInQRS();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IQR) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInQRS() {
    this.eventSubscriber = this.eventManager.subscribe('qRListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
