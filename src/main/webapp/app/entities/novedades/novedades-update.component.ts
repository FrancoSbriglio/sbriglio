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
import { INovedades, Novedades } from 'app/shared/model/novedades.model';
import { NovedadesService } from './novedades.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-novedades-update',
  templateUrl: './novedades-update.component.html'
})
export class NovedadesUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    fecha: [],
    descripcion: [],
    creada: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected novedadesService: NovedadesService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ novedades }) => {
      this.updateForm(novedades);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(novedades: INovedades) {
    this.editForm.patchValue({
      id: novedades.id,
      fecha: novedades.fecha != null ? novedades.fecha.format(DATE_TIME_FORMAT) : null,
      descripcion: novedades.descripcion,
      creada: novedades.creada
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const novedades = this.createFromForm();
    if (novedades.id !== undefined) {
      this.subscribeToSaveResponse(this.novedadesService.update(novedades));
    } else {
      this.subscribeToSaveResponse(this.novedadesService.create(novedades));
    }
  }

  private createFromForm(): INovedades {
    return {
      ...new Novedades(),
      id: this.editForm.get(['id']).value,
      fecha: this.editForm.get(['fecha']).value != null ? moment(this.editForm.get(['fecha']).value, DATE_TIME_FORMAT) : undefined,
      descripcion: this.editForm.get(['descripcion']).value,
      creada: this.editForm.get(['creada']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INovedades>>) {
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
