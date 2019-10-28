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
import { ICarnetDeConducir, CarnetDeConducir } from 'app/shared/model/carnet-de-conducir.model';
import { CarnetDeConducirService } from './carnet-de-conducir.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';

@Component({
  selector: 'jhi-carnet-de-conducir-update',
  templateUrl: './carnet-de-conducir-update.component.html'
})
export class CarnetDeConducirUpdateComponent implements OnInit {
  isSaving: boolean;

  personas: IPersona[];

  editForm = this.fb.group({
    id: [],
    categoria: [],
    fechaOtorgamiento: [],
    fechaVencimiento: [],
    carnetPersona: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected carnetDeConducirService: CarnetDeConducirService,
    protected personaService: PersonaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ carnetDeConducir }) => {
      this.updateForm(carnetDeConducir);
    });
    this.personaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPersona[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPersona[]>) => response.body)
      )
      .subscribe((res: IPersona[]) => (this.personas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(carnetDeConducir: ICarnetDeConducir) {
    this.editForm.patchValue({
      id: carnetDeConducir.id,
      categoria: carnetDeConducir.categoria,
      fechaOtorgamiento: carnetDeConducir.fechaOtorgamiento != null ? carnetDeConducir.fechaOtorgamiento.format(DATE_TIME_FORMAT) : null,
      fechaVencimiento: carnetDeConducir.fechaVencimiento != null ? carnetDeConducir.fechaVencimiento.format(DATE_TIME_FORMAT) : null,
      carnetPersona: carnetDeConducir.carnetPersona
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const carnetDeConducir = this.createFromForm();
    if (carnetDeConducir.id !== undefined) {
      this.subscribeToSaveResponse(this.carnetDeConducirService.update(carnetDeConducir));
    } else {
      this.subscribeToSaveResponse(this.carnetDeConducirService.create(carnetDeConducir));
    }
  }

  private createFromForm(): ICarnetDeConducir {
    return {
      ...new CarnetDeConducir(),
      id: this.editForm.get(['id']).value,
      categoria: this.editForm.get(['categoria']).value,
      fechaOtorgamiento:
        this.editForm.get(['fechaOtorgamiento']).value != null
          ? moment(this.editForm.get(['fechaOtorgamiento']).value, DATE_TIME_FORMAT)
          : undefined,
      fechaVencimiento:
        this.editForm.get(['fechaVencimiento']).value != null
          ? moment(this.editForm.get(['fechaVencimiento']).value, DATE_TIME_FORMAT)
          : undefined,
      carnetPersona: this.editForm.get(['carnetPersona']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICarnetDeConducir>>) {
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
