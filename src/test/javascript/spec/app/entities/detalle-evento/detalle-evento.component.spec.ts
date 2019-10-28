import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SbriglioTestModule } from '../../../test.module';
import { DetalleEventoComponent } from 'app/entities/detalle-evento/detalle-evento.component';
import { DetalleEventoService } from 'app/entities/detalle-evento/detalle-evento.service';
import { DetalleEvento } from 'app/shared/model/detalle-evento.model';

describe('Component Tests', () => {
  describe('DetalleEvento Management Component', () => {
    let comp: DetalleEventoComponent;
    let fixture: ComponentFixture<DetalleEventoComponent>;
    let service: DetalleEventoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [DetalleEventoComponent],
        providers: []
      })
        .overrideTemplate(DetalleEventoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetalleEventoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetalleEventoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DetalleEvento(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.detalleEventos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
