import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoEvento } from 'app/shared/model/estado-evento.model';

@Component({
  selector: 'jhi-estado-evento-detail',
  templateUrl: './estado-evento-detail.component.html'
})
export class EstadoEventoDetailComponent implements OnInit {
  estadoEvento: IEstadoEvento;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ estadoEvento }) => {
      this.estadoEvento = estadoEvento;
    });
  }

  previousState() {
    window.history.back();
  }
}
