import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { EstadoEventoUpdateComponent } from 'app/entities/estado-evento/estado-evento-update.component';
import { EstadoEventoService } from 'app/entities/estado-evento/estado-evento.service';
import { EstadoEvento } from 'app/shared/model/estado-evento.model';

describe('Component Tests', () => {
  describe('EstadoEvento Management Update Component', () => {
    let comp: EstadoEventoUpdateComponent;
    let fixture: ComponentFixture<EstadoEventoUpdateComponent>;
    let service: EstadoEventoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [EstadoEventoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EstadoEventoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoEventoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadoEventoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EstadoEvento(123);
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
        const entity = new EstadoEvento();
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
