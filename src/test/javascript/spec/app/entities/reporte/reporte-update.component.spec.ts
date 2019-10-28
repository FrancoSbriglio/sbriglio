import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { ReporteUpdateComponent } from 'app/entities/reporte/reporte-update.component';
import { ReporteService } from 'app/entities/reporte/reporte.service';
import { Reporte } from 'app/shared/model/reporte.model';

describe('Component Tests', () => {
  describe('Reporte Management Update Component', () => {
    let comp: ReporteUpdateComponent;
    let fixture: ComponentFixture<ReporteUpdateComponent>;
    let service: ReporteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [ReporteUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ReporteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReporteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReporteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Reporte(123);
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
        const entity = new Reporte();
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
