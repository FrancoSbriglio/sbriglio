import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IEstadoPersona, EstadoPersona } from 'app/shared/model/estado-persona.model';
import { EstadoPersonaService } from './estado-persona.service';

@Component({
  selector: 'jhi-estado-persona-update',
  templateUrl: './estado-persona-update.component.html'
})
export class EstadoPersonaUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreEstadoPersona: [],
    fecha: []
  });

  constructor(protected estadoPersonaService: EstadoPersonaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ estadoPersona }) => {
      this.updateForm(estadoPersona);
    });
  }

  updateForm(estadoPersona: IEstadoPersona) {
    this.editForm.patchValue({
      id: estadoPersona.id,
      nombreEstadoPersona: estadoPersona.nombreEstadoPersona,
      fecha: estadoPersona.fecha != null ? estadoPersona.fecha.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const estadoPersona = this.createFromForm();
    if (estadoPersona.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoPersonaService.update(estadoPersona));
    } else {
      this.subscribeToSaveResponse(this.estadoPersonaService.create(estadoPersona));
    }
  }

  private createFromForm(): IEstadoPersona {
    return {
      ...new EstadoPersona(),
      id: this.editForm.get(['id']).value,
      nombreEstadoPersona: this.editForm.get(['nombreEstadoPersona']).value,
      fecha: this.editForm.get(['fecha']).value != null ? moment(this.editForm.get(['fecha']).value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoPersona>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
