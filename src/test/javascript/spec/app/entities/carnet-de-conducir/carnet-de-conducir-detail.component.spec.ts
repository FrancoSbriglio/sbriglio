import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { CarnetDeConducirDetailComponent } from 'app/entities/carnet-de-conducir/carnet-de-conducir-detail.component';
import { CarnetDeConducir } from 'app/shared/model/carnet-de-conducir.model';

describe('Component Tests', () => {
  describe('CarnetDeConducir Management Detail Component', () => {
    let comp: CarnetDeConducirDetailComponent;
    let fixture: ComponentFixture<CarnetDeConducirDetailComponent>;
    const route = ({ data: of({ carnetDeConducir: new CarnetDeConducir(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [CarnetDeConducirDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CarnetDeConducirDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CarnetDeConducirDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.carnetDeConducir).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
