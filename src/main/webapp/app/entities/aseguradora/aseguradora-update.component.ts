import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IAseguradora, Aseguradora } from 'app/shared/model/aseguradora.model';
import { AseguradoraService } from './aseguradora.service';

@Component({
  selector: 'jhi-aseguradora-update',
  templateUrl: './aseguradora-update.component.html'
})
export class AseguradoraUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreSeguro: []
  });

  constructor(protected aseguradoraService: AseguradoraService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ aseguradora }) => {
      this.updateForm(aseguradora);
    });
  }

  updateForm(aseguradora: IAseguradora) {
    this.editForm.patchValue({
      id: aseguradora.id,
      nombreSeguro: aseguradora.nombreSeguro
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const aseguradora = this.createFromForm();
    if (aseguradora.id !== undefined) {
      this.subscribeToSaveResponse(this.aseguradoraService.update(aseguradora));
    } else {
      this.subscribeToSaveResponse(this.aseguradoraService.create(aseguradora));
    }
  }

  private createFromForm(): IAseguradora {
    return {
      ...new Aseguradora(),
      id: this.editForm.get(['id']).value,
      nombreSeguro: this.editForm.get(['nombreSeguro']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAseguradora>>) {
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
