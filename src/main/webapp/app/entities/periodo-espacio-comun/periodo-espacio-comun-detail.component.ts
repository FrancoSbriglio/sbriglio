import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPeriodoEspacioComun } from 'app/shared/model/periodo-espacio-comun.model';

@Component({
  selector: 'jhi-periodo-espacio-comun-detail',
  templateUrl: './periodo-espacio-comun-detail.component.html'
})
export class PeriodoEspacioComunDetailComponent implements OnInit {
  periodoEspacioComun: IPeriodoEspacioComun;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ periodoEspacioComun }) => {
      this.periodoEspacioComun = periodoEspacioComun;
    });
  }

  previousState() {
    window.history.back();
  }
}
