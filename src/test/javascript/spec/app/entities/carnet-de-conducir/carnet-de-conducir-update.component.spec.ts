import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { CarnetDeConducirUpdateComponent } from 'app/entities/carnet-de-conducir/carnet-de-conducir-update.component';
import { CarnetDeConducirService } from 'app/entities/carnet-de-conducir/carnet-de-conducir.service';
import { CarnetDeConducir } from 'app/shared/model/carnet-de-conducir.model';

describe('Component Tests', () => {
  describe('CarnetDeConducir Management Update Component', () => {
    let comp: CarnetDeConducirUpdateComponent;
    let fixture: ComponentFixture<CarnetDeConducirUpdateComponent>;
    let service: CarnetDeConducirService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [CarnetDeConducirUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CarnetDeConducirUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CarnetDeConducirUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CarnetDeConducirService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CarnetDeConducir(123);
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
        const entity = new CarnetDeConducir();
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
