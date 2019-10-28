import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEmpresa } from 'app/shared/model/empresa.model';
import { AccountService } from 'app/core/auth/account.service';
import { EmpresaService } from './empresa.service';

@Component({
  selector: 'jhi-empresa',
  templateUrl: './empresa.component.html'
})
export class EmpresaComponent implements OnInit, OnDestroy {
  empresas: IEmpresa[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected empresaService: EmpresaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.empresaService
      .query()
      .pipe(
        filter((res: HttpResponse<IEmpresa[]>) => res.ok),
        map((res: HttpResponse<IEmpresa[]>) => res.body)
      )
      .subscribe(
        (res: IEmpresa[]) => {
          this.empresas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEmpresas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEmpresa) {
    return item.id;
  }

  registerChangeInEmpresas() {
    this.eventSubscriber = this.eventManager.subscribe('empresaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
