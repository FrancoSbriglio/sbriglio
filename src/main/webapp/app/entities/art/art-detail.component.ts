import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IArt } from 'app/shared/model/art.model';

@Component({
  selector: 'jhi-art-detail',
  templateUrl: './art-detail.component.html'
})
export class ArtDetailComponent implements OnInit {
  art: IArt;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ art }) => {
      this.art = art;
    });
  }

  previousState() {
    window.history.back();
  }
}
