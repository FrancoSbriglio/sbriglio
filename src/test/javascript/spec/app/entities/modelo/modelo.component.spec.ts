import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SbriglioTestModule } from '../../../test.module';
import { ModeloComponent } from 'app/entities/modelo/modelo.component';
import { ModeloService } from 'app/entities/modelo/modelo.service';
import { Modelo } from 'app/shared/model/modelo.model';

describe('Component Tests', () => {
  describe('Modelo Management Component', () => {
    let comp: ModeloComponent;
    let fixture: ComponentFixture<ModeloComponent>;
    let service: ModeloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [ModeloComponent],
        providers: []
      })
        .overrideTemplate(ModeloComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ModeloComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ModeloService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Modelo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.modelos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
