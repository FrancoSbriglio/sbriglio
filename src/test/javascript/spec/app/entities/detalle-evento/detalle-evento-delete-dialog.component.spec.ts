import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SbriglioTestModule } from '../../../test.module';
import { DetalleEventoDeleteDialogComponent } from 'app/entities/detalle-evento/detalle-evento-delete-dialog.component';
import { DetalleEventoService } from 'app/entities/detalle-evento/detalle-evento.service';

describe('Component Tests', () => {
  describe('DetalleEvento Management Delete Component', () => {
    let comp: DetalleEventoDeleteDialogComponent;
    let fixture: ComponentFixture<DetalleEventoDeleteDialogComponent>;
    let service: DetalleEventoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [DetalleEventoDeleteDialogComponent]
      })
        .overrideTemplate(DetalleEventoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DetalleEventoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetalleEventoService);
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
