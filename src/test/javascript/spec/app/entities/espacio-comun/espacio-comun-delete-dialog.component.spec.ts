import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SbriglioTestModule } from '../../../test.module';
import { EspacioComunDeleteDialogComponent } from 'app/entities/espacio-comun/espacio-comun-delete-dialog.component';
import { EspacioComunService } from 'app/entities/espacio-comun/espacio-comun.service';

describe('Component Tests', () => {
  describe('EspacioComun Management Delete Component', () => {
    let comp: EspacioComunDeleteDialogComponent;
    let fixture: ComponentFixture<EspacioComunDeleteDialogComponent>;
    let service: EspacioComunService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [EspacioComunDeleteDialogComponent]
      })
        .overrideTemplate(EspacioComunDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EspacioComunDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EspacioComunService);
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
