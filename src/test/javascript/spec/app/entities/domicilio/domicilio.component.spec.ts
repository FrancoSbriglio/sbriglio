import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SbriglioTestModule } from '../../../test.module';
import { DomicilioComponent } from 'app/entities/domicilio/domicilio.component';
import { DomicilioService } from 'app/entities/domicilio/domicilio.service';
import { Domicilio } from 'app/shared/model/domicilio.model';

describe('Component Tests', () => {
  describe('Domicilio Management Component', () => {
    let comp: DomicilioComponent;
    let fixture: ComponentFixture<DomicilioComponent>;
    let service: DomicilioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [DomicilioComponent],
        providers: []
      })
        .overrideTemplate(DomicilioComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DomicilioComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DomicilioService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Domicilio(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.domicilios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
