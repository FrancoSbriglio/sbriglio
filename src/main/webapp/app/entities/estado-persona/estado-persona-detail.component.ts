import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoPersona } from 'app/shared/model/estado-persona.model';

@Component({
  selector: 'jhi-estado-persona-detail',
  templateUrl: './estado-persona-detail.component.html'
})
export class EstadoPersonaDetailComponent implements OnInit {
  estadoPersona: IEstadoPersona;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ estadoPersona }) => {
      this.estadoPersona = estadoPersona;
    });
  }

  previousState() {
    window.history.back();
  }
}
