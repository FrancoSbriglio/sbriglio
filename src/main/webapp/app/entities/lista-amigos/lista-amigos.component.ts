import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IListaAmigos } from 'app/shared/model/lista-amigos.model';
import { AccountService } from 'app/core/auth/account.service';
import { ListaAmigosService } from './lista-amigos.service';

@Component({
  selector: 'jhi-lista-amigos',
  templateUrl: './lista-amigos.component.html'
})
export class ListaAmigosComponent implements OnInit, OnDestroy {
  listaAmigos: IListaAmigos[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected listaAmigosService: ListaAmigosService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.listaAmigosService
      .query()
      .pipe(
        filter((res: HttpResponse<IListaAmigos[]>) => res.ok),
        map((res: HttpResponse<IListaAmigos[]>) => res.body)
      )
      .subscribe(
        (res: IListaAmigos[]) => {
          this.listaAmigos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInListaAmigos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IListaAmigos) {
    return item.id;
  }

  registerChangeInListaAmigos() {
    this.eventSubscriber = this.eventManager.subscribe('listaAmigosListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
