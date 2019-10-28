import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SbriglioTestModule } from '../../../test.module';
import { PlanillaIngresoEgresoDeleteDialogComponent } from 'app/entities/planilla-ingreso-egreso/planilla-ingreso-egreso-delete-dialog.component';
import { PlanillaIngresoEgresoService } from 'app/entities/planilla-ingreso-egreso/planilla-ingreso-egreso.service';

describe('Component Tests', () => {
  describe('PlanillaIngresoEgreso Management Delete Component', () => {
    let comp: PlanillaIngresoEgresoDeleteDialogComponent;
    let fixture: ComponentFixture<PlanillaIngresoEgresoDeleteDialogComponent>;
    let service: PlanillaIngresoEgresoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [PlanillaIngresoEgresoDeleteDialogComponent]
      })
        .overrideTemplate(PlanillaIngresoEgresoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlanillaIngresoEgresoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlanillaIngresoEgresoService);
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
