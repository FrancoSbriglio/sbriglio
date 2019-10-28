import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { BarrioUpdateComponent } from 'app/entities/barrio/barrio-update.component';
import { BarrioService } from 'app/entities/barrio/barrio.service';
import { Barrio } from 'app/shared/model/barrio.model';

describe('Component Tests', () => {
  describe('Barrio Management Update Component', () => {
    let comp: BarrioUpdateComponent;
    let fixture: ComponentFixture<BarrioUpdateComponent>;
    let service: BarrioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [BarrioUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BarrioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BarrioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BarrioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Barrio(123);
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
        const entity = new Barrio();
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
