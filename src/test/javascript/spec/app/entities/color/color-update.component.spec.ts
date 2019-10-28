import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { ColorUpdateComponent } from 'app/entities/color/color-update.component';
import { ColorService } from 'app/entities/color/color.service';
import { Color } from 'app/shared/model/color.model';

describe('Component Tests', () => {
  describe('Color Management Update Component', () => {
    let comp: ColorUpdateComponent;
    let fixture: ComponentFixture<ColorUpdateComponent>;
    let service: ColorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [ColorUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ColorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ColorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ColorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Color(123);
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
        const entity = new Color();
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
