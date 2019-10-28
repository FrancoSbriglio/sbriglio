import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ISeguro, Seguro } from 'app/shared/model/seguro.model';
import { SeguroService } from './seguro.service';
import { IVehiculo } from 'app/shared/model/vehiculo.model';
import { VehiculoService } from 'app/entities/vehiculo/vehiculo.service';
import { IAseguradora } from 'app/shared/model/aseguradora.model';
import { AseguradoraService } from 'app/entities/aseguradora/aseguradora.service';

@Component({
  selector: 'jhi-seguro-update',
  templateUrl: './seguro-update.component.html'
})
export class SeguroUpdateComponent implements OnInit {
  isSaving: boolean;

  vehiculos: IVehiculo[];

  aseguradoras: IAseguradora[];

  editForm = this.fb.group({
    id: [],
    fechaVencimientoSeguro: [],
    seguroVehiculo: [],
    seguroAseguradora: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected seguroService: SeguroService,
    protected vehiculoService: VehiculoService,
    protected aseguradoraService: AseguradoraService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ seguro }) => {
      this.updateForm(seguro);
    });
    this.vehiculoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVehiculo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVehiculo[]>) => response.body)
      )
      .subscribe((res: IVehiculo[]) => (this.vehiculos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.aseguradoraService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAseguradora[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAseguradora[]>) => response.body)
      )
      .subscribe((res: IAseguradora[]) => (this.aseguradoras = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(seguro: ISeguro) {
    this.editForm.patchValue({
      id: seguro.id,
      fechaVencimientoSeguro: seguro.fechaVencimientoSeguro != null ? seguro.fechaVencimientoSeguro.format(DATE_TIME_FORMAT) : null,
      seguroVehiculo: seguro.seguroVehiculo,
      seguroAseguradora: seguro.seguroAseguradora
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const seguro = this.createFromForm();
    if (seguro.id !== undefined) {
      this.subscribeToSaveResponse(this.seguroService.update(seguro));
    } else {
      this.subscribeToSaveResponse(this.seguroService.create(seguro));
    }
  }

  private createFromForm(): ISeguro {
    return {
      ...new Seguro(),
      id: this.editForm.get(['id']).value,
      fechaVencimientoSeguro:
        this.editForm.get(['fechaVencimientoSeguro']).value != null
          ? moment(this.editForm.get(['fechaVencimientoSeguro']).value, DATE_TIME_FORMAT)
          : undefined,
      seguroVehiculo: this.editForm.get(['seguroVehiculo']).value,
      seguroAseguradora: this.editForm.get(['seguroAseguradora']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISeguro>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackVehiculoById(index: number, item: IVehiculo) {
    return item.id;
  }

  trackAseguradoraById(index: number, item: IAseguradora) {
    return item.id;
  }
}
