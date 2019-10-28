import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDomicilio, Domicilio } from 'app/shared/model/domicilio.model';
import { DomicilioService } from './domicilio.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';

@Component({
  selector: 'jhi-domicilio-update',
  templateUrl: './domicilio-update.component.html'
})
export class DomicilioUpdateComponent implements OnInit {
  isSaving: boolean;

  personas: IPersona[];

  editForm = this.fb.group({
    id: [],
    casaDomicilio: [],
    deptoDomicilio: [],
    manzanaDomicilio: [],
    pisoDomicilio: [],
    domiciliopersonas: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected domicilioService: DomicilioService,
    protected personaService: PersonaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ domicilio }) => {
      this.updateForm(domicilio);
    });
    this.personaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPersona[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPersona[]>) => response.body)
      )
      .subscribe((res: IPersona[]) => (this.personas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(domicilio: IDomicilio) {
    this.editForm.patchValue({
      id: domicilio.id,
      casaDomicilio: domicilio.casaDomicilio,
      deptoDomicilio: domicilio.deptoDomicilio,
      manzanaDomicilio: domicilio.manzanaDomicilio,
      pisoDomicilio: domicilio.pisoDomicilio,
      domiciliopersonas: domicilio.domiciliopersonas
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const domicilio = this.createFromForm();
    if (domicilio.id !== undefined) {
      this.subscribeToSaveResponse(this.domicilioService.update(domicilio));
    } else {
      this.subscribeToSaveResponse(this.domicilioService.create(domicilio));
    }
  }

  private createFromForm(): IDomicilio {
    return {
      ...new Domicilio(),
      id: this.editForm.get(['id']).value,
      casaDomicilio: this.editForm.get(['casaDomicilio']).value,
      deptoDomicilio: this.editForm.get(['deptoDomicilio']).value,
      manzanaDomicilio: this.editForm.get(['manzanaDomicilio']).value,
      pisoDomicilio: this.editForm.get(['pisoDomicilio']).value,
      domiciliopersonas: this.editForm.get(['domiciliopersonas']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDomicilio>>) {
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
