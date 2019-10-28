import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { DetalleEventoDetailComponent } from 'app/entities/detalle-evento/detalle-evento-detail.component';
import { DetalleEvento } from 'app/shared/model/detalle-evento.model';

describe('Component Tests', () => {
  describe('DetalleEvento Management Detail Component', () => {
    let comp: DetalleEventoDetailComponent;
    let fixture: ComponentFixture<DetalleEventoDetailComponent>;
    const route = ({ data: of({ detalleEvento: new DetalleEvento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [DetalleEventoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DetalleEventoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DetalleEventoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.detalleEvento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
