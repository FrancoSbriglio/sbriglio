import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { BarrioDetailComponent } from 'app/entities/barrio/barrio-detail.component';
import { Barrio } from 'app/shared/model/barrio.model';

describe('Component Tests', () => {
  describe('Barrio Management Detail Component', () => {
    let comp: BarrioDetailComponent;
    let fixture: ComponentFixture<BarrioDetailComponent>;
    const route = ({ data: of({ barrio: new Barrio(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [BarrioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BarrioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BarrioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.barrio).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
