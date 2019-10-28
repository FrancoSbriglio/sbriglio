import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { INormaBarrio, NormaBarrio } from 'app/shared/model/norma-barrio.model';
import { NormaBarrioService } from './norma-barrio.service';

@Component({
  selector: 'jhi-norma-barrio-update',
  templateUrl: './norma-barrio-update.component.html'
})
export class NormaBarrioUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    titulonorma: [],
    descripcionnorma: []
  });

  constructor(protected normaBarrioService: NormaBarrioService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ normaBarrio }) => {
      this.updateForm(normaBarrio);
    });
  }

  updateForm(normaBarrio: INormaBarrio) {
    this.editForm.patchValue({
      id: normaBarrio.id,
      titulonorma: normaBarrio.titulonorma,
      descripcionnorma: normaBarrio.descripcionnorma
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const normaBarrio = this.createFromForm();
    if (normaBarrio.id !== undefined) {
      this.subscribeToSaveResponse(this.normaBarrioService.update(normaBarrio));
    } else {
      this.subscribeToSaveResponse(this.normaBarrioService.create(normaBarrio));
    }
  }

  private createFromForm(): INormaBarrio {
    return {
      ...new NormaBarrio(),
      id: this.editForm.get(['id']).value,
      titulonorma: this.editForm.get(['titulonorma']).value,
      descripcionnorma: this.editForm.get(['descripcionnorma']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INormaBarrio>>) {
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
