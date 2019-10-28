import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { EspacioComunUpdateComponent } from 'app/entities/espacio-comun/espacio-comun-update.component';
import { EspacioComunService } from 'app/entities/espacio-comun/espacio-comun.service';
import { EspacioComun } from 'app/shared/model/espacio-comun.model';

describe('Component Tests', () => {
  describe('EspacioComun Management Update Component', () => {
    let comp: EspacioComunUpdateComponent;
    let fixture: ComponentFixture<EspacioComunUpdateComponent>;
    let service: EspacioComunService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [EspacioComunUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EspacioComunUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EspacioComunUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EspacioComunService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EspacioComun(123);
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
        const entity = new EspacioComun();
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
