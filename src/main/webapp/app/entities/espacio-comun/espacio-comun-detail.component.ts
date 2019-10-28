import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IEspacioComun } from 'app/shared/model/espacio-comun.model';

@Component({
  selector: 'jhi-espacio-comun-detail',
  templateUrl: './espacio-comun-detail.component.html'
})
export class EspacioComunDetailComponent implements OnInit {
  espacioComun: IEspacioComun;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ espacioComun }) => {
      this.espacioComun = espacioComun;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
