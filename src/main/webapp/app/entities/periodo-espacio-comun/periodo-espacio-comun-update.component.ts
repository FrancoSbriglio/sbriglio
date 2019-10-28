import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IPeriodoEspacioComun, PeriodoEspacioComun } from 'app/shared/model/periodo-espacio-comun.model';
import { PeriodoEspacioComunService } from './periodo-espacio-comun.service';

@Component({
  selector: 'jhi-periodo-espacio-comun-update',
  templateUrl: './periodo-espacio-comun-update.component.html'
})
export class PeriodoEspacioComunUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    periodo: []
  });

  constructor(
    protected periodoEspacioComunService: PeriodoEspacioComunService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ periodoEspacioComun }) => {
      this.updateForm(periodoEspacioComun);
    });
  }

  updateForm(periodoEspacioComun: IPeriodoEspacioComun) {
    this.editForm.patchValue({
      id: periodoEspacioComun.id,
      periodo: periodoEspacioComun.periodo != null ? periodoEspacioComun.periodo.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const periodoEspacioComun = this.createFromForm();
    if (periodoEspacioComun.id !== undefined) {
      this.subscribeToSaveResponse(this.periodoEspacioComunService.update(periodoEspacioComun));
    } else {
      this.subscribeToSaveResponse(this.periodoEspacioComunService.create(periodoEspacioComun));
    }
  }

  private createFromForm(): IPeriodoEspacioComun {
    return {
      ...new PeriodoEspacioComun(),
      id: this.editForm.get(['id']).value,
      periodo: this.editForm.get(['periodo']).value != null ? moment(this.editForm.get(['periodo']).value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPeriodoEspacioComun>>) {
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
