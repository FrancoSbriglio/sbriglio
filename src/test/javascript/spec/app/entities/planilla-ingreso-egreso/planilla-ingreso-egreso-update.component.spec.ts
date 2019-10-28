import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { PlanillaIngresoEgresoUpdateComponent } from 'app/entities/planilla-ingreso-egreso/planilla-ingreso-egreso-update.component';
import { PlanillaIngresoEgresoService } from 'app/entities/planilla-ingreso-egreso/planilla-ingreso-egreso.service';
import { PlanillaIngresoEgreso } from 'app/shared/model/planilla-ingreso-egreso.model';

describe('Component Tests', () => {
  describe('PlanillaIngresoEgreso Management Update Component', () => {
    let comp: PlanillaIngresoEgresoUpdateComponent;
    let fixture: ComponentFixture<PlanillaIngresoEgresoUpdateComponent>;
    let service: PlanillaIngresoEgresoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [PlanillaIngresoEgresoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlanillaIngresoEgresoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlanillaIngresoEgresoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlanillaIngresoEgresoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PlanillaIngresoEgreso(123);
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
        const entity = new PlanillaIngresoEgreso();
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
