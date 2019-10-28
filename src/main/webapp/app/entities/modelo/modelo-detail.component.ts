import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IModelo } from 'app/shared/model/modelo.model';

@Component({
  selector: 'jhi-modelo-detail',
  templateUrl: './modelo-detail.component.html'
})
export class ModeloDetailComponent implements OnInit {
  modelo: IModelo;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ modelo }) => {
      this.modelo = modelo;
    });
  }

  previousState() {
    window.history.back();
  }
}
