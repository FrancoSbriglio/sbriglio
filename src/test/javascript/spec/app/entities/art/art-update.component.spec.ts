import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { ArtUpdateComponent } from 'app/entities/art/art-update.component';
import { ArtService } from 'app/entities/art/art.service';
import { Art } from 'app/shared/model/art.model';

describe('Component Tests', () => {
  describe('Art Management Update Component', () => {
    let comp: ArtUpdateComponent;
    let fixture: ComponentFixture<ArtUpdateComponent>;
    let service: ArtService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [ArtUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ArtUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArtUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ArtService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Art(123);
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
        const entity = new Art();
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
