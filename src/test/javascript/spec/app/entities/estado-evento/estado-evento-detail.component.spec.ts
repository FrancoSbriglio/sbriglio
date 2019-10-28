import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { EstadoEventoDetailComponent } from 'app/entities/estado-evento/estado-evento-detail.component';
import { EstadoEvento } from 'app/shared/model/estado-evento.model';

describe('Component Tests', () => {
  describe('EstadoEvento Management Detail Component', () => {
    let comp: EstadoEventoDetailComponent;
    let fixture: ComponentFixture<EstadoEventoDetailComponent>;
    const route = ({ data: of({ estadoEvento: new EstadoEvento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [EstadoEventoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EstadoEventoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoEventoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estadoEvento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
