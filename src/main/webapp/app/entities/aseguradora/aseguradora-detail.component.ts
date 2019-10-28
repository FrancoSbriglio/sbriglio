import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAseguradora } from 'app/shared/model/aseguradora.model';

@Component({
  selector: 'jhi-aseguradora-detail',
  templateUrl: './aseguradora-detail.component.html'
})
export class AseguradoraDetailComponent implements OnInit {
  aseguradora: IAseguradora;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ aseguradora }) => {
      this.aseguradora = aseguradora;
    });
  }

  previousState() {
    window.history.back();
  }
}
