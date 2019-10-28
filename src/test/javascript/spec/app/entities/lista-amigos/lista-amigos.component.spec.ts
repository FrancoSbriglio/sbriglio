import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SbriglioTestModule } from '../../../test.module';
import { ListaAmigosComponent } from 'app/entities/lista-amigos/lista-amigos.component';
import { ListaAmigosService } from 'app/entities/lista-amigos/lista-amigos.service';
import { ListaAmigos } from 'app/shared/model/lista-amigos.model';

describe('Component Tests', () => {
  describe('ListaAmigos Management Component', () => {
    let comp: ListaAmigosComponent;
    let fixture: ComponentFixture<ListaAmigosComponent>;
    let service: ListaAmigosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [ListaAmigosComponent],
        providers: []
      })
        .overrideTemplate(ListaAmigosComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ListaAmigosComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ListaAmigosService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ListaAmigos(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.listaAmigos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
