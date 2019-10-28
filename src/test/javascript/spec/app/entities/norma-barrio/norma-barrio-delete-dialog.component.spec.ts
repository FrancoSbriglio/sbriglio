import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SbriglioTestModule } from '../../../test.module';
import { NormaBarrioDeleteDialogComponent } from 'app/entities/norma-barrio/norma-barrio-delete-dialog.component';
import { NormaBarrioService } from 'app/entities/norma-barrio/norma-barrio.service';

describe('Component Tests', () => {
  describe('NormaBarrio Management Delete Component', () => {
    let comp: NormaBarrioDeleteDialogComponent;
    let fixture: ComponentFixture<NormaBarrioDeleteDialogComponent>;
    let service: NormaBarrioService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [NormaBarrioDeleteDialogComponent]
      })
        .overrideTemplate(NormaBarrioDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NormaBarrioDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NormaBarrioService);
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
