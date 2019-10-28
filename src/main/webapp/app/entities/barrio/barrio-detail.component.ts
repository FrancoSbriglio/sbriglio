import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBarrio } from 'app/shared/model/barrio.model';

@Component({
  selector: 'jhi-barrio-detail',
  templateUrl: './barrio-detail.component.html'
})
export class BarrioDetailComponent implements OnInit {
  barrio: IBarrio;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ barrio }) => {
      this.barrio = barrio;
    });
  }

  previousState() {
    window.history.back();
  }
}
