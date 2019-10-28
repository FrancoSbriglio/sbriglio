import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SbriglioTestModule } from '../../../test.module';
import { NormaBarrioComponent } from 'app/entities/norma-barrio/norma-barrio.component';
import { NormaBarrioService } from 'app/entities/norma-barrio/norma-barrio.service';
import { NormaBarrio } from 'app/shared/model/norma-barrio.model';

describe('Component Tests', () => {
  describe('NormaBarrio Management Component', () => {
    let comp: NormaBarrioComponent;
    let fixture: ComponentFixture<NormaBarrioComponent>;
    let service: NormaBarrioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [NormaBarrioComponent],
        providers: []
      })
        .overrideTemplate(NormaBarrioComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NormaBarrioComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NormaBarrioService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NormaBarrio(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.normaBarrios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
