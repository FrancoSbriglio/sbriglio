import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { ListaAmigosDetailComponent } from 'app/entities/lista-amigos/lista-amigos-detail.component';
import { ListaAmigos } from 'app/shared/model/lista-amigos.model';

describe('Component Tests', () => {
  describe('ListaAmigos Management Detail Component', () => {
    let comp: ListaAmigosDetailComponent;
    let fixture: ComponentFixture<ListaAmigosDetailComponent>;
    const route = ({ data: of({ listaAmigos: new ListaAmigos(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [ListaAmigosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ListaAmigosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ListaAmigosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.listaAmigos).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
