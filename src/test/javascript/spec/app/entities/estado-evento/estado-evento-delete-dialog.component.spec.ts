import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SbriglioTestModule } from '../../../test.module';
import { EstadoEventoDeleteDialogComponent } from 'app/entities/estado-evento/estado-evento-delete-dialog.component';
import { EstadoEventoService } from 'app/entities/estado-evento/estado-evento.service';

describe('Component Tests', () => {
  describe('EstadoEvento Management Delete Component', () => {
    let comp: EstadoEventoDeleteDialogComponent;
    let fixture: ComponentFixture<EstadoEventoDeleteDialogComponent>;
    let service: EstadoEventoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [EstadoEventoDeleteDialogComponent]
      })
        .overrideTemplate(EstadoEventoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoEventoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadoEventoService);
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
