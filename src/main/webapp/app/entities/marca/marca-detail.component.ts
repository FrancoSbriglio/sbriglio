import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMarca } from 'app/shared/model/marca.model';

@Component({
  selector: 'jhi-marca-detail',
  templateUrl: './marca-detail.component.html'
})
export class MarcaDetailComponent implements OnInit {
  marca: IMarca;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ marca }) => {
      this.marca = marca;
    });
  }

  previousState() {
    window.history.back();
  }
}
