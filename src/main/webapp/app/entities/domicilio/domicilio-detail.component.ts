import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDomicilio } from 'app/shared/model/domicilio.model';

@Component({
  selector: 'jhi-domicilio-detail',
  templateUrl: './domicilio-detail.component.html'
})
export class DomicilioDetailComponent implements OnInit {
  domicilio: IDomicilio;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ domicilio }) => {
      this.domicilio = domicilio;
    });
  }

  previousState() {
    window.history.back();
  }
}
