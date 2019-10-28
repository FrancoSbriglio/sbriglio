import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { NormaBarrioUpdateComponent } from 'app/entities/norma-barrio/norma-barrio-update.component';
import { NormaBarrioService } from 'app/entities/norma-barrio/norma-barrio.service';
import { NormaBarrio } from 'app/shared/model/norma-barrio.model';

describe('Component Tests', () => {
  describe('NormaBarrio Management Update Component', () => {
    let comp: NormaBarrioUpdateComponent;
    let fixture: ComponentFixture<NormaBarrioUpdateComponent>;
    let service: NormaBarrioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [NormaBarrioUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NormaBarrioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NormaBarrioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NormaBarrioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NormaBarrio(123);
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
        const entity = new NormaBarrio();
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
