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
import { IArt, Art } from 'app/shared/model/art.model';
import { ArtService } from './art.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';

@Component({
  selector: 'jhi-art-update',
  templateUrl: './art-update.component.html'
})
export class ArtUpdateComponent implements OnInit {
  isSaving: boolean;

  personas: IPersona[];

  editForm = this.fb.group({
    id: [],
    fechaVencimientoArt: [],
    artDersona: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected artService: ArtService,
    protected personaService: PersonaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ art }) => {
      this.updateForm(art);
    });
    this.personaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPersona[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPersona[]>) => response.body)
      )
      .subscribe((res: IPersona[]) => (this.personas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(art: IArt) {
    this.editForm.patchValue({
      id: art.id,
      fechaVencimientoArt: art.fechaVencimientoArt != null ? art.fechaVencimientoArt.format(DATE_TIME_FORMAT) : null,
      artDersona: art.artDersona
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const art = this.createFromForm();
    if (art.id !== undefined) {
      this.subscribeToSaveResponse(this.artService.update(art));
    } else {
      this.subscribeToSaveResponse(this.artService.create(art));
    }
  }

  private createFromForm(): IArt {
    return {
      ...new Art(),
      id: this.editForm.get(['id']).value,
      fechaVencimientoArt:
        this.editForm.get(['fechaVencimientoArt']).value != null
          ? moment(this.editForm.get(['fechaVencimientoArt']).value, DATE_TIME_FORMAT)
          : undefined,
      artDersona: this.editForm.get(['artDersona']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArt>>) {
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
