import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SbriglioTestModule } from '../../../test.module';
import { BarrioComponent } from 'app/entities/barrio/barrio.component';
import { BarrioService } from 'app/entities/barrio/barrio.service';
import { Barrio } from 'app/shared/model/barrio.model';

describe('Component Tests', () => {
  describe('Barrio Management Component', () => {
    let comp: BarrioComponent;
    let fixture: ComponentFixture<BarrioComponent>;
    let service: BarrioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [BarrioComponent],
        providers: []
      })
        .overrideTemplate(BarrioComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BarrioComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BarrioService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Barrio(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.barrios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
