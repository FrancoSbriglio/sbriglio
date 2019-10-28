import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SbriglioTestModule } from '../../../test.module';
import { BarrioDeleteDialogComponent } from 'app/entities/barrio/barrio-delete-dialog.component';
import { BarrioService } from 'app/entities/barrio/barrio.service';

describe('Component Tests', () => {
  describe('Barrio Management Delete Component', () => {
    let comp: BarrioDeleteDialogComponent;
    let fixture: ComponentFixture<BarrioDeleteDialogComponent>;
    let service: BarrioService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [BarrioDeleteDialogComponent]
      })
        .overrideTemplate(BarrioDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BarrioDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BarrioService);
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
