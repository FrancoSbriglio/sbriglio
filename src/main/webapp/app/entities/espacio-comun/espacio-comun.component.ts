import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IEspacioComun } from 'app/shared/model/espacio-comun.model';
import { AccountService } from 'app/core/auth/account.service';
import { EspacioComunService } from './espacio-comun.service';

@Component({
  selector: 'jhi-espacio-comun',
  templateUrl: './espacio-comun.component.html'
})
export class EspacioComunComponent implements OnInit, OnDestroy {
  espacioComuns: IEspacioComun[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected espacioComunService: EspacioComunService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.espacioComunService
      .query()
      .pipe(
        filter((res: HttpResponse<IEspacioComun[]>) => res.ok),
        map((res: HttpResponse<IEspacioComun[]>) => res.body)
      )
      .subscribe(
        (res: IEspacioComun[]) => {
          this.espacioComuns = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEspacioComuns();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEspacioComun) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInEspacioComuns() {
    this.eventSubscriber = this.eventManager.subscribe('espacioComunListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
