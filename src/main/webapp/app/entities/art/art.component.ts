import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IArt } from 'app/shared/model/art.model';
import { AccountService } from 'app/core/auth/account.service';
import { ArtService } from './art.service';

@Component({
  selector: 'jhi-art',
  templateUrl: './art.component.html'
})
export class ArtComponent implements OnInit, OnDestroy {
  arts: IArt[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected artService: ArtService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.artService
      .query()
      .pipe(
        filter((res: HttpResponse<IArt[]>) => res.ok),
        map((res: HttpResponse<IArt[]>) => res.body)
      )
      .subscribe(
        (res: IArt[]) => {
          this.arts = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInArts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IArt) {
    return item.id;
  }

  registerChangeInArts() {
    this.eventSubscriber = this.eventManager.subscribe('artListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
