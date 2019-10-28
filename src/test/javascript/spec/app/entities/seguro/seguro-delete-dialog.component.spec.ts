import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SbriglioTestModule } from '../../../test.module';
import { SeguroDeleteDialogComponent } from 'app/entities/seguro/seguro-delete-dialog.component';
import { SeguroService } from 'app/entities/seguro/seguro.service';

describe('Component Tests', () => {
  describe('Seguro Management Delete Component', () => {
    let comp: SeguroDeleteDialogComponent;
    let fixture: ComponentFixture<SeguroDeleteDialogComponent>;
    let service: SeguroService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [SeguroDeleteDialogComponent]
      })
        .overrideTemplate(SeguroDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SeguroDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SeguroService);
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
