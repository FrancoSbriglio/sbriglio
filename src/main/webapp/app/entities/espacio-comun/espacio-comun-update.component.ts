import { Component, OnInit, ElementRef } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IEspacioComun, EspacioComun } from 'app/shared/model/espacio-comun.model';
import { EspacioComunService } from './espacio-comun.service';
import { IBarrio } from 'app/shared/model/barrio.model';
import { BarrioService } from 'app/entities/barrio/barrio.service';
import { IPeriodoEspacioComun } from 'app/shared/model/periodo-espacio-comun.model';
import { PeriodoEspacioComunService } from 'app/entities/periodo-espacio-comun/periodo-espacio-comun.service';

@Component({
  selector: 'jhi-espacio-comun-update',
  templateUrl: './espacio-comun-update.component.html'
})
export class EspacioComunUpdateComponent implements OnInit {
  isSaving: boolean;

  barrios: IBarrio[];

  periodoespaciocomuns: IPeriodoEspacioComun[];

  editForm = this.fb.group({
    id: [],
    nombreEspacioComun: [],
    disponibilidadDesde: [],
    disponibilidadHasta: [],
    fotoEspacioComun: [],
    fotoEspacioComunContentType: [],
    horaDesde: [],
    horaHasta: [],
    espacioBarrio: [],
    espacioTipos: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected espacioComunService: EspacioComunService,
    protected barrioService: BarrioService,
    protected periodoEspacioComunService: PeriodoEspacioComunService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ espacioComun }) => {
      this.updateForm(espacioComun);
    });
    this.barrioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IBarrio[]>) => mayBeOk.ok),
        map((response: HttpResponse<IBarrio[]>) => response.body)
      )
      .subscribe((res: IBarrio[]) => (this.barrios = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.periodoEspacioComunService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPeriodoEspacioComun[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPeriodoEspacioComun[]>) => response.body)
      )
      .subscribe((res: IPeriodoEspacioComun[]) => (this.periodoespaciocomuns = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(espacioComun: IEspacioComun) {
    this.editForm.patchValue({
      id: espacioComun.id,
      nombreEspacioComun: espacioComun.nombreEspacioComun,
      disponibilidadDesde: espacioComun.disponibilidadDesde != null ? espacioComun.disponibilidadDesde.format(DATE_TIME_FORMAT) : null,
      disponibilidadHasta: espacioComun.disponibilidadHasta != null ? espacioComun.disponibilidadHasta.format(DATE_TIME_FORMAT) : null,
      fotoEspacioComun: espacioComun.fotoEspacioComun,
      fotoEspacioComunContentType: espacioComun.fotoEspacioComunContentType,
      horaDesde: espacioComun.horaDesde != null ? espacioComun.horaDesde.format(DATE_TIME_FORMAT) : null,
      horaHasta: espacioComun.horaHasta != null ? espacioComun.horaHasta.format(DATE_TIME_FORMAT) : null,
      espacioBarrio: espacioComun.espacioBarrio,
      espacioTipos: espacioComun.espacioTipos
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file: File = event.target.files[0];
        if (isImage && !file.type.startsWith('image/')) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      // eslint-disable-next-line no-console
      () => console.log('blob added'), // success
      this.onError
    );
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const espacioComun = this.createFromForm();
    if (espacioComun.id !== undefined) {
      this.subscribeToSaveResponse(this.espacioComunService.update(espacioComun));
    } else {
      this.subscribeToSaveResponse(this.espacioComunService.create(espacioComun));
    }
  }

  private createFromForm(): IEspacioComun {
    return {
      ...new EspacioComun(),
      id: this.editForm.get(['id']).value,
      nombreEspacioComun: this.editForm.get(['nombreEspacioComun']).value,
      disponibilidadDesde:
        this.editForm.get(['disponibilidadDesde']).value != null
          ? moment(this.editForm.get(['disponibilidadDesde']).value, DATE_TIME_FORMAT)
          : undefined,
      disponibilidadHasta:
        this.editForm.get(['disponibilidadHasta']).value != null
          ? moment(this.editForm.get(['disponibilidadHasta']).value, DATE_TIME_FORMAT)
          : undefined,
      fotoEspacioComunContentType: this.editForm.get(['fotoEspacioComunContentType']).value,
      fotoEspacioComun: this.editForm.get(['fotoEspacioComun']).value,
      horaDesde:
        this.editForm.get(['horaDesde']).value != null ? moment(this.editForm.get(['horaDesde']).value, DATE_TIME_FORMAT) : undefined,
      horaHasta:
        this.editForm.get(['horaHasta']).value != null ? moment(this.editForm.get(['horaHasta']).value, DATE_TIME_FORMAT) : undefined,
      espacioBarrio: this.editForm.get(['espacioBarrio']).value,
      espacioTipos: this.editForm.get(['espacioTipos']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEspacioComun>>) {
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

  trackBarrioById(index: number, item: IBarrio) {
    return item.id;
  }

  trackPeriodoEspacioComunById(index: number, item: IPeriodoEspacioComun) {
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
