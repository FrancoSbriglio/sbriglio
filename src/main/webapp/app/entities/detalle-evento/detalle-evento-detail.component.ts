import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDetalleEvento } from 'app/shared/model/detalle-evento.model';

@Component({
  selector: 'jhi-detalle-evento-detail',
  templateUrl: './detalle-evento-detail.component.html'
})
export class DetalleEventoDetailComponent implements OnInit {
  detalleEvento: IDetalleEvento;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ detalleEvento }) => {
      this.detalleEvento = detalleEvento;
    });
  }

  previousState() {
    window.history.back();
  }
}
