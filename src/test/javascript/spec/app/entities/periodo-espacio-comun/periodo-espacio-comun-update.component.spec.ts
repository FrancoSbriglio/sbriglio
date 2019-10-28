import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { PeriodoEspacioComunUpdateComponent } from 'app/entities/periodo-espacio-comun/periodo-espacio-comun-update.component';
import { PeriodoEspacioComunService } from 'app/entities/periodo-espacio-comun/periodo-espacio-comun.service';
import { PeriodoEspacioComun } from 'app/shared/model/periodo-espacio-comun.model';

describe('Component Tests', () => {
  describe('PeriodoEspacioComun Management Update Component', () => {
    let comp: PeriodoEspacioComunUpdateComponent;
    let fixture: ComponentFixture<PeriodoEspacioComunUpdateComponent>;
    let service: PeriodoEspacioComunService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [PeriodoEspacioComunUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PeriodoEspacioComunUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PeriodoEspacioComunUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PeriodoEspacioComunService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PeriodoEspacioComun(123);
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
        const entity = new PeriodoEspacioComun();
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
