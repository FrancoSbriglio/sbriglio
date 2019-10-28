import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { DetalleEventoUpdateComponent } from 'app/entities/detalle-evento/detalle-evento-update.component';
import { DetalleEventoService } from 'app/entities/detalle-evento/detalle-evento.service';
import { DetalleEvento } from 'app/shared/model/detalle-evento.model';

describe('Component Tests', () => {
  describe('DetalleEvento Management Update Component', () => {
    let comp: DetalleEventoUpdateComponent;
    let fixture: ComponentFixture<DetalleEventoUpdateComponent>;
    let service: DetalleEventoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [DetalleEventoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DetalleEventoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetalleEventoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetalleEventoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DetalleEvento(123);
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
        const entity = new DetalleEvento();
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
