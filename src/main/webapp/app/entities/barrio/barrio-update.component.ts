import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IBarrio, Barrio } from 'app/shared/model/barrio.model';
import { BarrioService } from './barrio.service';
import { INormaBarrio } from 'app/shared/model/norma-barrio.model';
import { NormaBarrioService } from 'app/entities/norma-barrio/norma-barrio.service';

@Component({
  selector: 'jhi-barrio-update',
  templateUrl: './barrio-update.component.html'
})
export class BarrioUpdateComponent implements OnInit {
  isSaving: boolean;

  normabarrios: INormaBarrio[];

  editForm = this.fb.group({
    id: [],
    nombreBarrio: [],
    cuitBarrio: [],
    barrioNorma: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected barrioService: BarrioService,
    protected normaBarrioService: NormaBarrioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ barrio }) => {
      this.updateForm(barrio);
    });
    this.normaBarrioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<INormaBarrio[]>) => mayBeOk.ok),
        map((response: HttpResponse<INormaBarrio[]>) => response.body)
      )
      .subscribe((res: INormaBarrio[]) => (this.normabarrios = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(barrio: IBarrio) {
    this.editForm.patchValue({
      id: barrio.id,
      nombreBarrio: barrio.nombreBarrio,
      cuitBarrio: barrio.cuitBarrio,
      barrioNorma: barrio.barrioNorma
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const barrio = this.createFromForm();
    if (barrio.id !== undefined) {
      this.subscribeToSaveResponse(this.barrioService.update(barrio));
    } else {
      this.subscribeToSaveResponse(this.barrioService.create(barrio));
    }
  }

  private createFromForm(): IBarrio {
    return {
      ...new Barrio(),
      id: this.editForm.get(['id']).value,
      nombreBarrio: this.editForm.get(['nombreBarrio']).value,
      cuitBarrio: this.editForm.get(['cuitBarrio']).value,
      barrioNorma: this.editForm.get(['barrioNorma']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBarrio>>) {
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

  trackNormaBarrioById(index: number, item: INormaBarrio) {
    return item.id;
  }
}
