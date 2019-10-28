import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { ListaAmigosUpdateComponent } from 'app/entities/lista-amigos/lista-amigos-update.component';
import { ListaAmigosService } from 'app/entities/lista-amigos/lista-amigos.service';
import { ListaAmigos } from 'app/shared/model/lista-amigos.model';

describe('Component Tests', () => {
  describe('ListaAmigos Management Update Component', () => {
    let comp: ListaAmigosUpdateComponent;
    let fixture: ComponentFixture<ListaAmigosUpdateComponent>;
    let service: ListaAmigosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [ListaAmigosUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ListaAmigosUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ListaAmigosUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ListaAmigosService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ListaAmigos(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ListaAmigos();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
