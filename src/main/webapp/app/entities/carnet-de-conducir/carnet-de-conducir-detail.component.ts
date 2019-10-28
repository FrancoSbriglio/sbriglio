import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICarnetDeConducir } from 'app/shared/model/carnet-de-conducir.model';

@Component({
  selector: 'jhi-carnet-de-conducir-detail',
  templateUrl: './carnet-de-conducir-detail.component.html'
})
export class CarnetDeConducirDetailComponent implements OnInit {
  carnetDeConducir: ICarnetDeConducir;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ carnetDeConducir }) => {
      this.carnetDeConducir = carnetDeConducir;
    });
  }

  previousState() {
    window.history.back();
  }
}
