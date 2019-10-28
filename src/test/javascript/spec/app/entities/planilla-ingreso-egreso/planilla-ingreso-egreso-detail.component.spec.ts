import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { PlanillaIngresoEgresoDetailComponent } from 'app/entities/planilla-ingreso-egreso/planilla-ingreso-egreso-detail.component';
import { PlanillaIngresoEgreso } from 'app/shared/model/planilla-ingreso-egreso.model';

describe('Component Tests', () => {
  describe('PlanillaIngresoEgreso Management Detail Component', () => {
    let comp: PlanillaIngresoEgresoDetailComponent;
    let fixture: ComponentFixture<PlanillaIngresoEgresoDetailComponent>;
    const route = ({ data: of({ planillaIngresoEgreso: new PlanillaIngresoEgreso(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [PlanillaIngresoEgresoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlanillaIngresoEgresoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlanillaIngresoEgresoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.planillaIngresoEgreso).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
