import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SbriglioTestModule } from '../../../test.module';
import { EventoComponent } from 'app/entities/evento/evento.component';
import { EventoService } from 'app/entities/evento/evento.service';
import { Evento } from 'app/shared/model/evento.model';

describe('Component Tests', () => {
  describe('Evento Management Component', () => {
    let comp: EventoComponent;
    let fixture: ComponentFixture<EventoComponent>;
    let service: EventoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [EventoComponent],
        providers: []
      })
        .overrideTemplate(EventoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EventoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EventoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Evento(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.eventos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
