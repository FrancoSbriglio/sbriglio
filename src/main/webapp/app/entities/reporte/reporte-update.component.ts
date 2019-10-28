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
import { IReporte, Reporte } from 'app/shared/model/reporte.model';
import { ReporteService } from './reporte.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-reporte-update',
  templateUrl: './reporte-update.component.html'
})
export class ReporteUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    fecha: [],
    descripcion: [],
    reportePersona: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected reporteService: ReporteService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ reporte }) => {
      this.updateForm(reporte);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(reporte: IReporte) {
    this.editForm.patchValue({
      id: reporte.id,
      fecha: reporte.fecha != null ? reporte.fecha.format(DATE_TIME_FORMAT) : null,
      descripcion: reporte.descripcion,
      reportePersona: reporte.reportePersona
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const reporte = this.createFromForm();
    if (reporte.id !== undefined) {
      this.subscribeToSaveResponse(this.reporteService.update(reporte));
    } else {
      this.subscribeToSaveResponse(this.reporteService.create(reporte));
    }
  }

  private createFromForm(): IReporte {
    return {
      ...new Reporte(),
      id: this.editForm.get(['id']).value,
      fecha: this.editForm.get(['fecha']).value != null ? moment(this.editForm.get(['fecha']).value, DATE_TIME_FORMAT) : undefined,
      descripcion: this.editForm.get(['descripcion']).value,
      reportePersona: this.editForm.get(['reportePersona']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReporte>>) {
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

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
