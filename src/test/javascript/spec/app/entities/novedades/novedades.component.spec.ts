import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SbriglioTestModule } from '../../../test.module';
import { NovedadesComponent } from 'app/entities/novedades/novedades.component';
import { NovedadesService } from 'app/entities/novedades/novedades.service';
import { Novedades } from 'app/shared/model/novedades.model';

describe('Component Tests', () => {
  describe('Novedades Management Component', () => {
    let comp: NovedadesComponent;
    let fixture: ComponentFixture<NovedadesComponent>;
    let service: NovedadesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [NovedadesComponent],
        providers: []
      })
        .overrideTemplate(NovedadesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NovedadesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NovedadesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Novedades(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.novedades[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
