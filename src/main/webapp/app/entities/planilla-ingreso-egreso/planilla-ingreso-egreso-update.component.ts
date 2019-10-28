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
import { IPlanillaIngresoEgreso, PlanillaIngresoEgreso } from 'app/shared/model/planilla-ingreso-egreso.model';
import { PlanillaIngresoEgresoService } from './planilla-ingreso-egreso.service';
import { IBarrio } from 'app/shared/model/barrio.model';
import { BarrioService } from 'app/entities/barrio/barrio.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';
import { IQR } from 'app/shared/model/qr.model';
import { QRService } from 'app/entities/qr/qr.service';
import { IDomicilio } from 'app/shared/model/domicilio.model';
import { DomicilioService } from 'app/entities/domicilio/domicilio.service';
import { IVehiculo } from 'app/shared/model/vehiculo.model';
import { VehiculoService } from 'app/entities/vehiculo/vehiculo.service';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { EmpresaService } from 'app/entities/empresa/empresa.service';

@Component({
  selector: 'jhi-planilla-ingreso-egreso-update',
  templateUrl: './planilla-ingreso-egreso-update.component.html'
})
export class PlanillaIngresoEgresoUpdateComponent implements OnInit {
  isSaving: boolean;

  barrios: IBarrio[];

  personas: IPersona[];

  qrs: IQR[];

  domicilios: IDomicilio[];

  vehiculos: IVehiculo[];

  empresas: IEmpresa[];

  editForm = this.fb.group({
    id: [],
    autorizadoPrevio: [],
    acompaniantes: [],
    fechaIngreso: [],
    fechaEgreso: [],
    tipovisita: [],
    ingresoAPie: [],
    planillaBarrio: [],
    planillaPersona: [],
    planillaQr: [],
    planillaDestino: [],
    planillaVehiculo: [],
    planillaEmpresa: [],
    planillaAutorizador: [],
    planillaAcompaniantes: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected planillaIngresoEgresoService: PlanillaIngresoEgresoService,
    protected barrioService: BarrioService,
    protected personaService: PersonaService,
    protected qRService: QRService,
    protected domicilioService: DomicilioService,
    protected vehiculoService: VehiculoService,
    protected empresaService: EmpresaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ planillaIngresoEgreso }) => {
      this.updateForm(planillaIngresoEgreso);
    });
    this.barrioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IBarrio[]>) => mayBeOk.ok),
        map((response: HttpResponse<IBarrio[]>) => response.body)
      )
      .subscribe((res: IBarrio[]) => (this.barrios = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.personaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPersona[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPersona[]>) => response.body)
      )
      .subscribe((res: IPersona[]) => (this.personas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.qRService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IQR[]>) => mayBeOk.ok),
        map((response: HttpResponse<IQR[]>) => response.body)
      )
      .subscribe((res: IQR[]) => (this.qrs = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.domicilioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDomicilio[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDomicilio[]>) => response.body)
      )
      .subscribe((res: IDomicilio[]) => (this.domicilios = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.vehiculoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVehiculo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVehiculo[]>) => response.body)
      )
      .subscribe((res: IVehiculo[]) => (this.vehiculos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.empresaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEmpresa[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmpresa[]>) => response.body)
      )
      .subscribe((res: IEmpresa[]) => (this.empresas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(planillaIngresoEgreso: IPlanillaIngresoEgreso) {
    this.editForm.patchValue({
      id: planillaIngresoEgreso.id,
      autorizadoPrevio: planillaIngresoEgreso.autorizadoPrevio,
      acompaniantes: planillaIngresoEgreso.acompaniantes,
      fechaIngreso: planillaIngresoEgreso.fechaIngreso != null ? planillaIngresoEgreso.fechaIngreso.format(DATE_TIME_FORMAT) : null,
      fechaEgreso: planillaIngresoEgreso.fechaEgreso != null ? planillaIngresoEgreso.fechaEgreso.format(DATE_TIME_FORMAT) : null,
      tipovisita: planillaIngresoEgreso.tipovisita,
      ingresoAPie: planillaIngresoEgreso.ingresoAPie,
      planillaBarrio: planillaIngresoEgreso.planillaBarrio,
      planillaPersona: planillaIngresoEgreso.planillaPersona,
      planillaQr: planillaIngresoEgreso.planillaQr,
      planillaDestino: planillaIngresoEgreso.planillaDestino,
      planillaVehiculo: planillaIngresoEgreso.planillaVehiculo,
      planillaEmpresa: planillaIngresoEgreso.planillaEmpresa,
      planillaAutorizador: planillaIngresoEgreso.planillaAutorizador,
      planillaAcompaniantes: planillaIngresoEgreso.planillaAcompaniantes
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const planillaIngresoEgreso = this.createFromForm();
    if (planillaIngresoEgreso.id !== undefined) {
      this.subscribeToSaveResponse(this.planillaIngresoEgresoService.update(planillaIngresoEgreso));
    } else {
      this.subscribeToSaveResponse(this.planillaIngresoEgresoService.create(planillaIngresoEgreso));
    }
  }

  private createFromForm(): IPlanillaIngresoEgreso {
    return {
      ...new PlanillaIngresoEgreso(),
      id: this.editForm.get(['id']).value,
      autorizadoPrevio: this.editForm.get(['autorizadoPrevio']).value,
      acompaniantes: this.editForm.get(['acompaniantes']).value,
      fechaIngreso:
        this.editForm.get(['fechaIngreso']).value != null ? moment(this.editForm.get(['fechaIngreso']).value, DATE_TIME_FORMAT) : undefined,
      fechaEgreso:
        this.editForm.get(['fechaEgreso']).value != null ? moment(this.editForm.get(['fechaEgreso']).value, DATE_TIME_FORMAT) : undefined,
      tipovisita: this.editForm.get(['tipovisita']).value,
      ingresoAPie: this.editForm.get(['ingresoAPie']).value,
      planillaBarrio: this.editForm.get(['planillaBarrio']).value,
      planillaPersona: this.editForm.get(['planillaPersona']).value,
      planillaQr: this.editForm.get(['planillaQr']).value,
      planillaDestino: this.editForm.get(['planillaDestino']).value,
      planillaVehiculo: this.editForm.get(['planillaVehiculo']).value,
      planillaEmpresa: this.editForm.get(['planillaEmpresa']).value,
      planillaAutorizador: this.editForm.get(['planillaAutorizador']).value,
      planillaAcompaniantes: this.editForm.get(['planillaAcompaniantes']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlanillaIngresoEgreso>>) {
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

  trackPersonaById(index: number, item: IPersona) {
    return item.id;
  }

  trackQRById(index: number, item: IQR) {
    return item.id;
  }

  trackDomicilioById(index: number, item: IDomicilio) {
    return item.id;
  }

  trackVehiculoById(index: number, item: IVehiculo) {
    return item.id;
  }

  trackEmpresaById(index: number, item: IEmpresa) {
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
