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
import { IMensaje, Mensaje } from 'app/shared/model/mensaje.model';
import { MensajeService } from './mensaje.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-mensaje-update',
  templateUrl: './mensaje-update.component.html'
})
export class MensajeUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    fechaHoraMensaje: [],
    descripcionMensaje: [],
    estadoMensaje: [],
    userDestino: [],
    userOrigen: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected mensajeService: MensajeService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mensaje }) => {
      this.updateForm(mensaje);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(mensaje: IMensaje) {
    this.editForm.patchValue({
      id: mensaje.id,
      fechaHoraMensaje: mensaje.fechaHoraMensaje != null ? mensaje.fechaHoraMensaje.format(DATE_TIME_FORMAT) : null,
      descripcionMensaje: mensaje.descripcionMensaje,
      estadoMensaje: mensaje.estadoMensaje,
      userDestino: mensaje.userDestino,
      userOrigen: mensaje.userOrigen
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mensaje = this.createFromForm();
    if (mensaje.id !== undefined) {
      this.subscribeToSaveResponse(this.mensajeService.update(mensaje));
    } else {
      this.subscribeToSaveResponse(this.mensajeService.create(mensaje));
    }
  }

  private createFromForm(): IMensaje {
    return {
      ...new Mensaje(),
      id: this.editForm.get(['id']).value,
      fechaHoraMensaje:
        this.editForm.get(['fechaHoraMensaje']).value != null
          ? moment(this.editForm.get(['fechaHoraMensaje']).value, DATE_TIME_FORMAT)
          : undefined,
      descripcionMensaje: this.editForm.get(['descripcionMensaje']).value,
      estadoMensaje: this.editForm.get(['estadoMensaje']).value,
      userDestino: this.editForm.get(['userDestino']).value,
      userOrigen: this.editForm.get(['userOrigen']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMensaje>>) {
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
