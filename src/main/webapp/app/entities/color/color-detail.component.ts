import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IColor } from 'app/shared/model/color.model';

@Component({
  selector: 'jhi-color-detail',
  templateUrl: './color-detail.component.html'
})
export class ColorDetailComponent implements OnInit {
  color: IColor;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ color }) => {
      this.color = color;
    });
  }

  previousState() {
    window.history.back();
  }
}
