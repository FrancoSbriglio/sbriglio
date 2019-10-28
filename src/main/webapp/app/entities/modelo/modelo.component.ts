import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IModelo } from 'app/shared/model/modelo.model';
import { AccountService } from 'app/core/auth/account.service';
import { ModeloService } from './modelo.service';

@Component({
  selector: 'jhi-modelo',
  templateUrl: './modelo.component.html'
})
export class ModeloComponent implements OnInit, OnDestroy {
  modelos: IModelo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected modeloService: ModeloService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.modeloService
      .query()
      .pipe(
        filter((res: HttpResponse<IModelo[]>) => res.ok),
        map((res: HttpResponse<IModelo[]>) => res.body)
      )
      .subscribe(
        (res: IModelo[]) => {
          this.modelos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInModelos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IModelo) {
    return item.id;
  }

  registerChangeInModelos() {
    this.eventSubscriber = this.eventManager.subscribe('modeloListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
