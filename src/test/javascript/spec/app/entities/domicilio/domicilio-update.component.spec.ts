import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { DomicilioUpdateComponent } from 'app/entities/domicilio/domicilio-update.component';
import { DomicilioService } from 'app/entities/domicilio/domicilio.service';
import { Domicilio } from 'app/shared/model/domicilio.model';

describe('Component Tests', () => {
  describe('Domicilio Management Update Component', () => {
    let comp: DomicilioUpdateComponent;
    let fixture: ComponentFixture<DomicilioUpdateComponent>;
    let service: DomicilioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [DomicilioUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DomicilioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DomicilioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DomicilioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Domicilio(123);
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
        const entity = new Domicilio();
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
