import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { ModeloUpdateComponent } from 'app/entities/modelo/modelo-update.component';
import { ModeloService } from 'app/entities/modelo/modelo.service';
import { Modelo } from 'app/shared/model/modelo.model';

describe('Component Tests', () => {
  describe('Modelo Management Update Component', () => {
    let comp: ModeloUpdateComponent;
    let fixture: ComponentFixture<ModeloUpdateComponent>;
    let service: ModeloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [ModeloUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ModeloUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ModeloUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ModeloService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Modelo(123);
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
        const entity = new Modelo();
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
