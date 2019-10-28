import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { SeguroUpdateComponent } from 'app/entities/seguro/seguro-update.component';
import { SeguroService } from 'app/entities/seguro/seguro.service';
import { Seguro } from 'app/shared/model/seguro.model';

describe('Component Tests', () => {
  describe('Seguro Management Update Component', () => {
    let comp: SeguroUpdateComponent;
    let fixture: ComponentFixture<SeguroUpdateComponent>;
    let service: SeguroService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [SeguroUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SeguroUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SeguroUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SeguroService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Seguro(123);
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
        const entity = new Seguro();
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
