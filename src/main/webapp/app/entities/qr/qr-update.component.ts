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
import { IQR, QR } from 'app/shared/model/qr.model';
import { QRService } from './qr.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';
import { IDomicilio } from 'app/shared/model/domicilio.model';
import { DomicilioService } from 'app/entities/domicilio/domicilio.service';

@Component({
  selector: 'jhi-qr-update',
  templateUrl: './qr-update.component.html'
})
export class QRUpdateComponent implements OnInit {
  isSaving: boolean;

  personas: IPersona[];

  domicilios: IDomicilio[];

  editForm = this.fb.group({
    id: [],
    codigoQR: [],
    fechaFinQR: [],
    fotoQR: [],
    fotoQRContentType: [],
    tipoVisira: [],
    qrAutorizador: [],
    qrAutorizado: [],
    qrDomicilio: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected qRService: QRService,
    protected personaService: PersonaService,
    protected domicilioService: DomicilioService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ qR }) => {
      this.updateForm(qR);
    });
    this.personaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPersona[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPersona[]>) => response.body)
      )
      .subscribe((res: IPersona[]) => (this.personas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.domicilioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDomicilio[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDomicilio[]>) => response.body)
      )
      .subscribe((res: IDomicilio[]) => (this.domicilios = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(qR: IQR) {
    this.editForm.patchValue({
      id: qR.id,
      codigoQR: qR.codigoQR,
      fechaFinQR: qR.fechaFinQR != null ? qR.fechaFinQR.format(DATE_TIME_FORMAT) : null,
      fotoQR: qR.fotoQR,
      fotoQRContentType: qR.fotoQRContentType,
      tipoVisira: qR.tipoVisira,
      qrAutorizador: qR.qrAutorizador,
      qrAutorizado: qR.qrAutorizado,
      qrDomicilio: qR.qrDomicilio
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
    const qR = this.createFromForm();
    if (qR.id !== undefined) {
      this.subscribeToSaveResponse(this.qRService.update(qR));
    } else {
      this.subscribeToSaveResponse(this.qRService.create(qR));
    }
  }

  private createFromForm(): IQR {
    return {
      ...new QR(),
      id: this.editForm.get(['id']).value,
      codigoQR: this.editForm.get(['codigoQR']).value,
      fechaFinQR:
        this.editForm.get(['fechaFinQR']).value != null ? moment(this.editForm.get(['fechaFinQR']).value, DATE_TIME_FORMAT) : undefined,
      fotoQRContentType: this.editForm.get(['fotoQRContentType']).value,
      fotoQR: this.editForm.get(['fotoQR']).value,
      tipoVisira: this.editForm.get(['tipoVisira']).value,
      qrAutorizador: this.editForm.get(['qrAutorizador']).value,
      qrAutorizado: this.editForm.get(['qrAutorizado']).value,
      qrDomicilio: this.editForm.get(['qrDomicilio']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQR>>) {
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

  trackDomicilioById(index: number, item: IDomicilio) {
    return item.id;
  }
}
