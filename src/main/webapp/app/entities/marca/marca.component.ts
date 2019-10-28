import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMarca } from 'app/shared/model/marca.model';
import { AccountService } from 'app/core/auth/account.service';
import { MarcaService } from './marca.service';

@Component({
  selector: 'jhi-marca',
  templateUrl: './marca.component.html'
})
export class MarcaComponent implements OnInit, OnDestroy {
  marcas: IMarca[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected marcaService: MarcaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.marcaService
      .query()
      .pipe(
        filter((res: HttpResponse<IMarca[]>) => res.ok),
        map((res: HttpResponse<IMarca[]>) => res.body)
      )
      .subscribe(
        (res: IMarca[]) => {
          this.marcas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMarcas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMarca) {
    return item.id;
  }

  registerChangeInMarcas() {
    this.eventSubscriber = this.eventManager.subscribe('marcaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
