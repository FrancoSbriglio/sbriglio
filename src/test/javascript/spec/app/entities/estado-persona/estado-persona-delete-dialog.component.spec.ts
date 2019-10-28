import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SbriglioTestModule } from '../../../test.module';
import { EstadoPersonaDeleteDialogComponent } from 'app/entities/estado-persona/estado-persona-delete-dialog.component';
import { EstadoPersonaService } from 'app/entities/estado-persona/estado-persona.service';

describe('Component Tests', () => {
  describe('EstadoPersona Management Delete Component', () => {
    let comp: EstadoPersonaDeleteDialogComponent;
    let fixture: ComponentFixture<EstadoPersonaDeleteDialogComponent>;
    let service: EstadoPersonaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [EstadoPersonaDeleteDialogComponent]
      })
        .overrideTemplate(EstadoPersonaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoPersonaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadoPersonaService);
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
