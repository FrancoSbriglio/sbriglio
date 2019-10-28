import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEstadoEvento, EstadoEvento } from 'app/shared/model/estado-evento.model';
import { EstadoEventoService } from './estado-evento.service';

@Component({
  selector: 'jhi-estado-evento-update',
  templateUrl: './estado-evento-update.component.html'
})
export class EstadoEventoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreEstadoEvento: []
  });

  constructor(protected estadoEventoService: EstadoEventoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ estadoEvento }) => {
      this.updateForm(estadoEvento);
    });
  }

  updateForm(estadoEvento: IEstadoEvento) {
    this.editForm.patchValue({
      id: estadoEvento.id,
      nombreEstadoEvento: estadoEvento.nombreEstadoEvento
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const estadoEvento = this.createFromForm();
    if (estadoEvento.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoEventoService.update(estadoEvento));
    } else {
      this.subscribeToSaveResponse(this.estadoEventoService.create(estadoEvento));
    }
  }

  private createFromForm(): IEstadoEvento {
    return {
      ...new EstadoEvento(),
      id: this.editForm.get(['id']).value,
      nombreEstadoEvento: this.editForm.get(['nombreEstadoEvento']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoEvento>>) {
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
