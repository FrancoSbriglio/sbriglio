import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICarnetDeConducir } from 'app/shared/model/carnet-de-conducir.model';
import { AccountService } from 'app/core/auth/account.service';
import { CarnetDeConducirService } from './carnet-de-conducir.service';

@Component({
  selector: 'jhi-carnet-de-conducir',
  templateUrl: './carnet-de-conducir.component.html'
})
export class CarnetDeConducirComponent implements OnInit, OnDestroy {
  carnetDeConducirs: ICarnetDeConducir[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected carnetDeConducirService: CarnetDeConducirService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.carnetDeConducirService
      .query()
      .pipe(
        filter((res: HttpResponse<ICarnetDeConducir[]>) => res.ok),
        map((res: HttpResponse<ICarnetDeConducir[]>) => res.body)
      )
      .subscribe(
        (res: ICarnetDeConducir[]) => {
          this.carnetDeConducirs = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCarnetDeConducirs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICarnetDeConducir) {
    return item.id;
  }

  registerChangeInCarnetDeConducirs() {
    this.eventSubscriber = this.eventManager.subscribe('carnetDeConducirListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
