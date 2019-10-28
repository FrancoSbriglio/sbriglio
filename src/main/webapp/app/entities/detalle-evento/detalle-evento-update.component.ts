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
import { IDetalleEvento, DetalleEvento } from 'app/shared/model/detalle-evento.model';
import { DetalleEventoService } from './detalle-evento.service';
import { IListaAmigos } from 'app/shared/model/lista-amigos.model';
import { ListaAmigosService } from 'app/entities/lista-amigos/lista-amigos.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';
import { IVehiculo } from 'app/shared/model/vehiculo.model';
import { VehiculoService } from 'app/entities/vehiculo/vehiculo.service';

@Component({
  selector: 'jhi-detalle-evento-update',
  templateUrl: './detalle-evento-update.component.html'
})
export class DetalleEventoUpdateComponent implements OnInit {
  isSaving: boolean;

  listaamigos: IListaAmigos[];

  personas: IPersona[];

  vehiculos: IVehiculo[];

  editForm = this.fb.group({
    id: [],
    horaIngreso: [],
    horaEngreso: [],
    amigosevento: [],
    detallePersonaEvento: [],
    detalleEventoVehiculo: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected detalleEventoService: DetalleEventoService,
    protected listaAmigosService: ListaAmigosService,
    protected personaService: PersonaService,
    protected vehiculoService: VehiculoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ detalleEvento }) => {
      this.updateForm(detalleEvento);
    });
    this.listaAmigosService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IListaAmigos[]>) => mayBeOk.ok),
        map((response: HttpResponse<IListaAmigos[]>) => response.body)
      )
      .subscribe((res: IListaAmigos[]) => (this.listaamigos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.personaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPersona[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPersona[]>) => response.body)
      )
      .subscribe((res: IPersona[]) => (this.personas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.vehiculoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVehiculo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVehiculo[]>) => response.body)
      )
      .subscribe((res: IVehiculo[]) => (this.vehiculos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(detalleEvento: IDetalleEvento) {
    this.editForm.patchValue({
      id: detalleEvento.id,
      horaIngreso: detalleEvento.horaIngreso != null ? detalleEvento.horaIngreso.format(DATE_TIME_FORMAT) : null,
      horaEngreso: detalleEvento.horaEngreso != null ? detalleEvento.horaEngreso.format(DATE_TIME_FORMAT) : null,
      amigosevento: detalleEvento.amigosevento,
      detallePersonaEvento: detalleEvento.detallePersonaEvento,
      detalleEventoVehiculo: detalleEvento.detalleEventoVehiculo
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const detalleEvento = this.createFromForm();
    if (detalleEvento.id !== undefined) {
      this.subscribeToSaveResponse(this.detalleEventoService.update(detalleEvento));
    } else {
      this.subscribeToSaveResponse(this.detalleEventoService.create(detalleEvento));
    }
  }

  private createFromForm(): IDetalleEvento {
    return {
      ...new DetalleEvento(),
      id: this.editForm.get(['id']).value,
      horaIngreso:
        this.editForm.get(['horaIngreso']).value != null ? moment(this.editForm.get(['horaIngreso']).value, DATE_TIME_FORMAT) : undefined,
      horaEngreso:
        this.editForm.get(['horaEngreso']).value != null ? moment(this.editForm.get(['horaEngreso']).value, DATE_TIME_FORMAT) : undefined,
      amigosevento: this.editForm.get(['amigosevento']).value,
      detallePersonaEvento: this.editForm.get(['detallePersonaEvento']).value,
      detalleEventoVehiculo: this.editForm.get(['detalleEventoVehiculo']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetalleEvento>>) {
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

  trackListaAmigosById(index: number, item: IListaAmigos) {
    return item.id;
  }

  trackPersonaById(index: number, item: IPersona) {
    return item.id;
  }

  trackVehiculoById(index: number, item: IVehiculo) {
    return item.id;
  }
}
