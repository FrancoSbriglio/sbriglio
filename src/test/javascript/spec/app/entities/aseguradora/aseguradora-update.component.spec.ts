import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { AseguradoraUpdateComponent } from 'app/entities/aseguradora/aseguradora-update.component';
import { AseguradoraService } from 'app/entities/aseguradora/aseguradora.service';
import { Aseguradora } from 'app/shared/model/aseguradora.model';

describe('Component Tests', () => {
  describe('Aseguradora Management Update Component', () => {
    let comp: AseguradoraUpdateComponent;
    let fixture: ComponentFixture<AseguradoraUpdateComponent>;
    let service: AseguradoraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [AseguradoraUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AseguradoraUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AseguradoraUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AseguradoraService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Aseguradora(123);
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
        const entity = new Aseguradora();
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
