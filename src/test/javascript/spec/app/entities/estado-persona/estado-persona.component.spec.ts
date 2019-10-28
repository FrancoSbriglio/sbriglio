import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SbriglioTestModule } from '../../../test.module';
import { EstadoPersonaComponent } from 'app/entities/estado-persona/estado-persona.component';
import { EstadoPersonaService } from 'app/entities/estado-persona/estado-persona.service';
import { EstadoPersona } from 'app/shared/model/estado-persona.model';

describe('Component Tests', () => {
  describe('EstadoPersona Management Component', () => {
    let comp: EstadoPersonaComponent;
    let fixture: ComponentFixture<EstadoPersonaComponent>;
    let service: EstadoPersonaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [EstadoPersonaComponent],
        providers: []
      })
        .overrideTemplate(EstadoPersonaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoPersonaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadoPersonaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EstadoPersona(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.estadoPersonas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
