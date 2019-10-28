import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { QRUpdateComponent } from 'app/entities/qr/qr-update.component';
import { QRService } from 'app/entities/qr/qr.service';
import { QR } from 'app/shared/model/qr.model';

describe('Component Tests', () => {
  describe('QR Management Update Component', () => {
    let comp: QRUpdateComponent;
    let fixture: ComponentFixture<QRUpdateComponent>;
    let service: QRService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [QRUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(QRUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(QRUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QRService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new QR(123);
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
        const entity = new QR();
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
