import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SbriglioTestModule } from '../../../test.module';
import { AseguradoraDeleteDialogComponent } from 'app/entities/aseguradora/aseguradora-delete-dialog.component';
import { AseguradoraService } from 'app/entities/aseguradora/aseguradora.service';

describe('Component Tests', () => {
  describe('Aseguradora Management Delete Component', () => {
    let comp: AseguradoraDeleteDialogComponent;
    let fixture: ComponentFixture<AseguradoraDeleteDialogComponent>;
    let service: AseguradoraService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [AseguradoraDeleteDialogComponent]
      })
        .overrideTemplate(AseguradoraDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AseguradoraDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AseguradoraService);
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
