import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SbriglioTestModule } from '../../../test.module';
import { AseguradoraComponent } from 'app/entities/aseguradora/aseguradora.component';
import { AseguradoraService } from 'app/entities/aseguradora/aseguradora.service';
import { Aseguradora } from 'app/shared/model/aseguradora.model';

describe('Component Tests', () => {
  describe('Aseguradora Management Component', () => {
    let comp: AseguradoraComponent;
    let fixture: ComponentFixture<AseguradoraComponent>;
    let service: AseguradoraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [AseguradoraComponent],
        providers: []
      })
        .overrideTemplate(AseguradoraComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AseguradoraComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AseguradoraService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Aseguradora(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.aseguradoras[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
