import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IEstadoPersona, EstadoPersona } from 'app/shared/model/estado-persona.model';
import { EstadoPersonaService } from './estado-persona.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';

@Component({
  selector: 'jhi-estado-persona-update',
  templateUrl: './estado-persona-update.component.html'
})
export class EstadoPersonaUpdateComponent implements OnInit {
  isSaving: boolean;

  personas: IPersona[];

  editForm = this.fb.group({
    id: [],
    nombreEstadoPersona: [],
    estadoPersona: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected estadoPersonaService: EstadoPersonaService,
    protected personaService: PersonaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ estadoPersona }) => {
      this.updateForm(estadoPersona);
    });
    this.personaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPersona[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPersona[]>) => response.body)
      )
      .subscribe((res: IPersona[]) => (this.personas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(estadoPersona: IEstadoPersona) {
    this.editForm.patchValue({
      id: estadoPersona.id,
      nombreEstadoPersona: estadoPersona.nombreEstadoPersona,
      estadoPersona: estadoPersona.estadoPersona
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
      estadoPersona: this.editForm.get(['estadoPersona']).value
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
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackPersonaById(index: number, item: IPersona) {
    return item.id;
  }
}
