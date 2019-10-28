import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMarca, Marca } from 'app/shared/model/marca.model';
import { MarcaService } from './marca.service';
import { IModelo } from 'app/shared/model/modelo.model';
import { ModeloService } from 'app/entities/modelo/modelo.service';

@Component({
  selector: 'jhi-marca-update',
  templateUrl: './marca-update.component.html'
})
export class MarcaUpdateComponent implements OnInit {
  isSaving: boolean;

  modelos: IModelo[];

  editForm = this.fb.group({
    id: [],
    nombreMarca: [],
    modelos: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected marcaService: MarcaService,
    protected modeloService: ModeloService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ marca }) => {
      this.updateForm(marca);
    });
    this.modeloService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IModelo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IModelo[]>) => response.body)
      )
      .subscribe((res: IModelo[]) => (this.modelos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(marca: IMarca) {
    this.editForm.patchValue({
      id: marca.id,
      nombreMarca: marca.nombreMarca,
      modelos: marca.modelos
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const marca = this.createFromForm();
    if (marca.id !== undefined) {
      this.subscribeToSaveResponse(this.marcaService.update(marca));
    } else {
      this.subscribeToSaveResponse(this.marcaService.create(marca));
    }
  }

  private createFromForm(): IMarca {
    return {
      ...new Marca(),
      id: this.editForm.get(['id']).value,
      nombreMarca: this.editForm.get(['nombreMarca']).value,
      modelos: this.editForm.get(['modelos']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMarca>>) {
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

  trackModeloById(index: number, item: IModelo) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
