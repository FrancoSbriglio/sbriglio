import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlanillaIngresoEgreso } from 'app/shared/model/planilla-ingreso-egreso.model';

@Component({
  selector: 'jhi-planilla-ingreso-egreso-detail',
  templateUrl: './planilla-ingreso-egreso-detail.component.html'
})
export class PlanillaIngresoEgresoDetailComponent implements OnInit {
  planillaIngresoEgreso: IPlanillaIngresoEgreso;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ planillaIngresoEgreso }) => {
      this.planillaIngresoEgreso = planillaIngresoEgreso;
    });
  }

  previousState() {
    window.history.back();
  }
}
