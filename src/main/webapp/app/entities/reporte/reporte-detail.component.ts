import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReporte } from 'app/shared/model/reporte.model';

@Component({
  selector: 'jhi-reporte-detail',
  templateUrl: './reporte-detail.component.html'
})
export class ReporteDetailComponent implements OnInit {
  reporte: IReporte;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reporte }) => {
      this.reporte = reporte;
    });
  }

  previousState() {
    window.history.back();
  }
}
