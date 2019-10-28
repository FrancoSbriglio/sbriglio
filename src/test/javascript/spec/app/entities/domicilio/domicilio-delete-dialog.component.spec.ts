import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SbriglioTestModule } from '../../../test.module';
import { DomicilioDeleteDialogComponent } from 'app/entities/domicilio/domicilio-delete-dialog.component';
import { DomicilioService } from 'app/entities/domicilio/domicilio.service';

describe('Component Tests', () => {
  describe('Domicilio Management Delete Component', () => {
    let comp: DomicilioDeleteDialogComponent;
    let fixture: ComponentFixture<DomicilioDeleteDialogComponent>;
    let service: DomicilioService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [DomicilioDeleteDialogComponent]
      })
        .overrideTemplate(DomicilioDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DomicilioDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DomicilioService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
