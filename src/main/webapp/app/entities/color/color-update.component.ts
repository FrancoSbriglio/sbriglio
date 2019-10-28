import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IColor, Color } from 'app/shared/model/color.model';
import { ColorService } from './color.service';

@Component({
  selector: 'jhi-color-update',
  templateUrl: './color-update.component.html'
})
export class ColorUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreColor: []
  });

  constructor(protected colorService: ColorService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ color }) => {
      this.updateForm(color);
    });
  }

  updateForm(color: IColor) {
    this.editForm.patchValue({
      id: color.id,
      nombreColor: color.nombreColor
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const color = this.createFromForm();
    if (color.id !== undefined) {
      this.subscribeToSaveResponse(this.colorService.update(color));
    } else {
      this.subscribeToSaveResponse(this.colorService.create(color));
    }
  }

  private createFromForm(): IColor {
    return {
      ...new Color(),
      id: this.editForm.get(['id']).value,
      nombreColor: this.editForm.get(['nombreColor']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IColor>>) {
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
