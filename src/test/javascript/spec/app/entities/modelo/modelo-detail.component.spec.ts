import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { ModeloDetailComponent } from 'app/entities/modelo/modelo-detail.component';
import { Modelo } from 'app/shared/model/modelo.model';

describe('Component Tests', () => {
  describe('Modelo Management Detail Component', () => {
    let comp: ModeloDetailComponent;
    let fixture: ComponentFixture<ModeloDetailComponent>;
    const route = ({ data: of({ modelo: new Modelo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [ModeloDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ModeloDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ModeloDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.modelo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
