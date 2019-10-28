import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { AseguradoraDetailComponent } from 'app/entities/aseguradora/aseguradora-detail.component';
import { Aseguradora } from 'app/shared/model/aseguradora.model';

describe('Component Tests', () => {
  describe('Aseguradora Management Detail Component', () => {
    let comp: AseguradoraDetailComponent;
    let fixture: ComponentFixture<AseguradoraDetailComponent>;
    const route = ({ data: of({ aseguradora: new Aseguradora(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [AseguradoraDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AseguradoraDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AseguradoraDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.aseguradora).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
