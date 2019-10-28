import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { ReporteDetailComponent } from 'app/entities/reporte/reporte-detail.component';
import { Reporte } from 'app/shared/model/reporte.model';

describe('Component Tests', () => {
  describe('Reporte Management Detail Component', () => {
    let comp: ReporteDetailComponent;
    let fixture: ComponentFixture<ReporteDetailComponent>;
    const route = ({ data: of({ reporte: new Reporte(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [ReporteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ReporteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReporteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.reporte).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
