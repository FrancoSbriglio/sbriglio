import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IColor } from 'app/shared/model/color.model';
import { AccountService } from 'app/core/auth/account.service';
import { ColorService } from './color.service';

@Component({
  selector: 'jhi-color',
  templateUrl: './color.component.html'
})
export class ColorComponent implements OnInit, OnDestroy {
  colors: IColor[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected colorService: ColorService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.colorService
      .query()
      .pipe(
        filter((res: HttpResponse<IColor[]>) => res.ok),
        map((res: HttpResponse<IColor[]>) => res.body)
      )
      .subscribe(
        (res: IColor[]) => {
          this.colors = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInColors();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IColor) {
    return item.id;
  }

  registerChangeInColors() {
    this.eventSubscriber = this.eventManager.subscribe('colorListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
