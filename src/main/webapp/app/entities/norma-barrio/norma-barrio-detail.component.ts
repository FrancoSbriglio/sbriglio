import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INormaBarrio } from 'app/shared/model/norma-barrio.model';

@Component({
  selector: 'jhi-norma-barrio-detail',
  templateUrl: './norma-barrio-detail.component.html'
})
export class NormaBarrioDetailComponent implements OnInit {
  normaBarrio: INormaBarrio;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ normaBarrio }) => {
      this.normaBarrio = normaBarrio;
    });
  }

  previousState() {
    window.history.back();
  }
}
