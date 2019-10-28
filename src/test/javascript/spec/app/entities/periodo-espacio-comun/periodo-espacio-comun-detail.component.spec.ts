import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { PeriodoEspacioComunDetailComponent } from 'app/entities/periodo-espacio-comun/periodo-espacio-comun-detail.component';
import { PeriodoEspacioComun } from 'app/shared/model/periodo-espacio-comun.model';

describe('Component Tests', () => {
  describe('PeriodoEspacioComun Management Detail Component', () => {
    let comp: PeriodoEspacioComunDetailComponent;
    let fixture: ComponentFixture<PeriodoEspacioComunDetailComponent>;
    const route = ({ data: of({ periodoEspacioComun: new PeriodoEspacioComun(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [PeriodoEspacioComunDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PeriodoEspacioComunDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PeriodoEspacioComunDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.periodoEspacioComun).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
