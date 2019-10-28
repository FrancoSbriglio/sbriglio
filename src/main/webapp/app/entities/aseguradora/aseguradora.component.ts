import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAseguradora } from 'app/shared/model/aseguradora.model';
import { AccountService } from 'app/core/auth/account.service';
import { AseguradoraService } from './aseguradora.service';

@Component({
  selector: 'jhi-aseguradora',
  templateUrl: './aseguradora.component.html'
})
export class AseguradoraComponent implements OnInit, OnDestroy {
  aseguradoras: IAseguradora[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected aseguradoraService: AseguradoraService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.aseguradoraService
      .query()
      .pipe(
        filter((res: HttpResponse<IAseguradora[]>) => res.ok),
        map((res: HttpResponse<IAseguradora[]>) => res.body)
      )
      .subscribe(
        (res: IAseguradora[]) => {
          this.aseguradoras = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAseguradoras();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAseguradora) {
    return item.id;
  }

  registerChangeInAseguradoras() {
    this.eventSubscriber = this.eventManager.subscribe('aseguradoraListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
