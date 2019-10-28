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
import { IEvento, Evento } from 'app/shared/model/evento.model';
import { EventoService } from './evento.service';
import { IDomicilio } from 'app/shared/model/domicilio.model';
import { DomicilioService } from 'app/entities/domicilio/domicilio.service';
import { IEspacioComun } from 'app/shared/model/espacio-comun.model';
import { EspacioComunService } from 'app/entities/espacio-comun/espacio-comun.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';
import { IEstadoEvento } from 'app/shared/model/estado-evento.model';
import { EstadoEventoService } from 'app/entities/estado-evento/estado-evento.service';
import { IPeriodoEspacioComun } from 'app/shared/model/periodo-espacio-comun.model';
import { PeriodoEspacioComunService } from 'app/entities/periodo-espacio-comun/periodo-espacio-comun.service';
import { IDetalleEvento } from 'app/shared/model/detalle-evento.model';
import { DetalleEventoService } from 'app/entities/detalle-evento/detalle-evento.service';

@Component({
  selector: 'jhi-evento-update',
  templateUrl: './evento-update.component.html'
})
export class EventoUpdateComponent implements OnInit {
  isSaving: boolean;

  domicilios: IDomicilio[];

  espaciocomuns: IEspacioComun[];

  personas: IPersona[];

  estadoeventos: IEstadoEvento[];

  periodoespaciocomuns: IPeriodoEspacioComun[];

  detalleeventos: IDetalleEvento[];

  editForm = this.fb.group({
    id: [],
    nombreEvento: [],
    fecha: [],
    horaInicio: [],
    horaFin: [],
    eventoDomicilio: [],
    eventoEspacio: [],
    eventoPersona: [],
    estadoEvento: [],
    eventoPeriodo: [],
    eventoDetalles: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected eventoService: EventoService,
    protected domicilioService: DomicilioService,
    protected espacioComunService: EspacioComunService,
    protected personaService: PersonaService,
    protected estadoEventoService: EstadoEventoService,
    protected periodoEspacioComunService: PeriodoEspacioComunService,
    protected detalleEventoService: DetalleEventoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ evento }) => {
      this.updateForm(evento);
    });
    this.domicilioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDomicilio[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDomicilio[]>) => response.body)
      )
      .subscribe((res: IDomicilio[]) => (this.domicilios = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.espacioComunService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEspacioComun[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEspacioComun[]>) => response.body)
      )
      .subscribe((res: IEspacioComun[]) => (this.espaciocomuns = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.personaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPersona[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPersona[]>) => response.body)
      )
      .subscribe((res: IPersona[]) => (this.personas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.estadoEventoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEstadoEvento[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEstadoEvento[]>) => response.body)
      )
      .subscribe((res: IEstadoEvento[]) => (this.estadoeventos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.periodoEspacioComunService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPeriodoEspacioComun[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPeriodoEspacioComun[]>) => response.body)
      )
      .subscribe((res: IPeriodoEspacioComun[]) => (this.periodoespaciocomuns = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.detalleEventoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDetalleEvento[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDetalleEvento[]>) => response.body)
      )
      .subscribe((res: IDetalleEvento[]) => (this.detalleeventos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(evento: IEvento) {
    this.editForm.patchValue({
      id: evento.id,
      nombreEvento: evento.nombreEvento,
      fecha: evento.fecha != null ? evento.fecha.format(DATE_TIME_FORMAT) : null,
      horaInicio: evento.horaInicio != null ? evento.horaInicio.format(DATE_TIME_FORMAT) : null,
      horaFin: evento.horaFin != null ? evento.horaFin.format(DATE_TIME_FORMAT) : null,
      eventoDomicilio: evento.eventoDomicilio,
      eventoEspacio: evento.eventoEspacio,
      eventoPersona: evento.eventoPersona,
      estadoEvento: evento.estadoEvento,
      eventoPeriodo: evento.eventoPeriodo,
      eventoDetalles: evento.eventoDetalles
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const evento = this.createFromForm();
    if (evento.id !== undefined) {
      this.subscribeToSaveResponse(this.eventoService.update(evento));
    } else {
      this.subscribeToSaveResponse(this.eventoService.create(evento));
    }
  }

  private createFromForm(): IEvento {
    return {
      ...new Evento(),
      id: this.editForm.get(['id']).value,
      nombreEvento: this.editForm.get(['nombreEvento']).value,
      fecha: this.editForm.get(['fecha']).value != null ? moment(this.editForm.get(['fecha']).value, DATE_TIME_FORMAT) : undefined,
      horaInicio:
        this.editForm.get(['horaInicio']).value != null ? moment(this.editForm.get(['horaInicio']).value, DATE_TIME_FORMAT) : undefined,
      horaFin: this.editForm.get(['horaFin']).value != null ? moment(this.editForm.get(['horaFin']).value, DATE_TIME_FORMAT) : undefined,
      eventoDomicilio: this.editForm.get(['eventoDomicilio']).value,
      eventoEspacio: this.editForm.get(['eventoEspacio']).value,
      eventoPersona: this.editForm.get(['eventoPersona']).value,
      estadoEvento: this.editForm.get(['estadoEvento']).value,
      eventoPeriodo: this.editForm.get(['eventoPeriodo']).value,
      eventoDetalles: this.editForm.get(['eventoDetalles']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEvento>>) {
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

  trackDomicilioById(index: number, item: IDomicilio) {
    return item.id;
  }

  trackEspacioComunById(index: number, item: IEspacioComun) {
    return item.id;
  }

  trackPersonaById(index: number, item: IPersona) {
    return item.id;
  }

  trackEstadoEventoById(index: number, item: IEstadoEvento) {
    return item.id;
  }

  trackPeriodoEspacioComunById(index: number, item: IPeriodoEspacioComun) {
    return item.id;
  }

  trackDetalleEventoById(index: number, item: IDetalleEvento) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
