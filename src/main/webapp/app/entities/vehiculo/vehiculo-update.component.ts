import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IVehiculo, Vehiculo } from 'app/shared/model/vehiculo.model';
import { VehiculoService } from './vehiculo.service';
import { IMarca } from 'app/shared/model/marca.model';
import { MarcaService } from 'app/entities/marca/marca.service';
import { IModelo } from 'app/shared/model/modelo.model';
import { ModeloService } from 'app/entities/modelo/modelo.service';
import { IColor } from 'app/shared/model/color.model';
import { ColorService } from 'app/entities/color/color.service';

@Component({
  selector: 'jhi-vehiculo-update',
  templateUrl: './vehiculo-update.component.html'
})
export class VehiculoUpdateComponent implements OnInit {
  isSaving: boolean;

  marcas: IMarca[];

  modelos: IModelo[];

  colors: IColor[];

  editForm = this.fb.group({
    id: [],
    dominio: [],
    vehiculoMarca: [],
    vehiculoModelo: [],
    vehiculoColor: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected vehiculoService: VehiculoService,
    protected marcaService: MarcaService,
    protected modeloService: ModeloService,
    protected colorService: ColorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ vehiculo }) => {
      this.updateForm(vehiculo);
    });
    this.marcaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMarca[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMarca[]>) => response.body)
      )
      .subscribe((res: IMarca[]) => (this.marcas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.modeloService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IModelo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IModelo[]>) => response.body)
      )
      .subscribe((res: IModelo[]) => (this.modelos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.colorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IColor[]>) => mayBeOk.ok),
        map((response: HttpResponse<IColor[]>) => response.body)
      )
      .subscribe((res: IColor[]) => (this.colors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(vehiculo: IVehiculo) {
    this.editForm.patchValue({
      id: vehiculo.id,
      dominio: vehiculo.dominio,
      vehiculoMarca: vehiculo.vehiculoMarca,
      vehiculoModelo: vehiculo.vehiculoModelo,
      vehiculoColor: vehiculo.vehiculoColor
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const vehiculo = this.createFromForm();
    if (vehiculo.id !== undefined) {
      this.subscribeToSaveResponse(this.vehiculoService.update(vehiculo));
    } else {
      this.subscribeToSaveResponse(this.vehiculoService.create(vehiculo));
    }
  }

  private createFromForm(): IVehiculo {
    return {
      ...new Vehiculo(),
      id: this.editForm.get(['id']).value,
      dominio: this.editForm.get(['dominio']).value,
      vehiculoMarca: this.editForm.get(['vehiculoMarca']).value,
      vehiculoModelo: this.editForm.get(['vehiculoModelo']).value,
      vehiculoColor: this.editForm.get(['vehiculoColor']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVehiculo>>) {
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

  trackMarcaById(index: number, item: IMarca) {
    return item.id;
  }

  trackModeloById(index: number, item: IModelo) {
    return item.id;
  }

  trackColorById(index: number, item: IColor) {
    return item.id;
  }
}
