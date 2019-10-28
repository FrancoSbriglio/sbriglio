import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { EstadoPersonaDetailComponent } from 'app/entities/estado-persona/estado-persona-detail.component';
import { EstadoPersona } from 'app/shared/model/estado-persona.model';

describe('Component Tests', () => {
  describe('EstadoPersona Management Detail Component', () => {
    let comp: EstadoPersonaDetailComponent;
    let fixture: ComponentFixture<EstadoPersonaDetailComponent>;
    const route = ({ data: of({ estadoPersona: new EstadoPersona(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [EstadoPersonaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EstadoPersonaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoPersonaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estadoPersona).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
