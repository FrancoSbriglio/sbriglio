import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SbriglioTestModule } from '../../../test.module';
import { PeriodoEspacioComunComponent } from 'app/entities/periodo-espacio-comun/periodo-espacio-comun.component';
import { PeriodoEspacioComunService } from 'app/entities/periodo-espacio-comun/periodo-espacio-comun.service';
import { PeriodoEspacioComun } from 'app/shared/model/periodo-espacio-comun.model';

describe('Component Tests', () => {
  describe('PeriodoEspacioComun Management Component', () => {
    let comp: PeriodoEspacioComunComponent;
    let fixture: ComponentFixture<PeriodoEspacioComunComponent>;
    let service: PeriodoEspacioComunService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [PeriodoEspacioComunComponent],
        providers: []
      })
        .overrideTemplate(PeriodoEspacioComunComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PeriodoEspacioComunComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PeriodoEspacioComunService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PeriodoEspacioComun(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.periodoEspacioComuns[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
