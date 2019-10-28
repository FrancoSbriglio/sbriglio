import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { EstadoPersonaUpdateComponent } from 'app/entities/estado-persona/estado-persona-update.component';
import { EstadoPersonaService } from 'app/entities/estado-persona/estado-persona.service';
import { EstadoPersona } from 'app/shared/model/estado-persona.model';

describe('Component Tests', () => {
  describe('EstadoPersona Management Update Component', () => {
    let comp: EstadoPersonaUpdateComponent;
    let fixture: ComponentFixture<EstadoPersonaUpdateComponent>;
    let service: EstadoPersonaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [EstadoPersonaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EstadoPersonaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoPersonaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadoPersonaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EstadoPersona(123);
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
        const entity = new EstadoPersona();
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
