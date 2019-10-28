import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SbriglioTestModule } from '../../../test.module';
import { PlanillaIngresoEgresoComponent } from 'app/entities/planilla-ingreso-egreso/planilla-ingreso-egreso.component';
import { PlanillaIngresoEgresoService } from 'app/entities/planilla-ingreso-egreso/planilla-ingreso-egreso.service';
import { PlanillaIngresoEgreso } from 'app/shared/model/planilla-ingreso-egreso.model';

describe('Component Tests', () => {
  describe('PlanillaIngresoEgreso Management Component', () => {
    let comp: PlanillaIngresoEgresoComponent;
    let fixture: ComponentFixture<PlanillaIngresoEgresoComponent>;
    let service: PlanillaIngresoEgresoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [PlanillaIngresoEgresoComponent],
        providers: []
      })
        .overrideTemplate(PlanillaIngresoEgresoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlanillaIngresoEgresoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlanillaIngresoEgresoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PlanillaIngresoEgreso(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.planillaIngresoEgresos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
