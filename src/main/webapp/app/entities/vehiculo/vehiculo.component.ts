import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVehiculo } from 'app/shared/model/vehiculo.model';
import { AccountService } from 'app/core/auth/account.service';
import { VehiculoService } from './vehiculo.service';

@Component({
  selector: 'jhi-vehiculo',
  templateUrl: './vehiculo.component.html'
})
export class VehiculoComponent implements OnInit, OnDestroy {
  vehiculos: IVehiculo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected vehiculoService: VehiculoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.vehiculoService
      .query()
      .pipe(
        filter((res: HttpResponse<IVehiculo[]>) => res.ok),
        map((res: HttpResponse<IVehiculo[]>) => res.body)
      )
      .subscribe(
        (res: IVehiculo[]) => {
          this.vehiculos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInVehiculos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IVehiculo) {
    return item.id;
  }

  registerChangeInVehiculos() {
    this.eventSubscriber = this.eventManager.subscribe('vehiculoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
