import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SbriglioTestModule } from '../../../test.module';
import { ReporteComponent } from 'app/entities/reporte/reporte.component';
import { ReporteService } from 'app/entities/reporte/reporte.service';
import { Reporte } from 'app/shared/model/reporte.model';

describe('Component Tests', () => {
  describe('Reporte Management Component', () => {
    let comp: ReporteComponent;
    let fixture: ComponentFixture<ReporteComponent>;
    let service: ReporteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [ReporteComponent],
        providers: []
      })
        .overrideTemplate(ReporteComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReporteComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReporteService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Reporte(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.reportes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
