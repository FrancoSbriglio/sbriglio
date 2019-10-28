import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SbriglioTestModule } from '../../../test.module';
import { CarnetDeConducirDeleteDialogComponent } from 'app/entities/carnet-de-conducir/carnet-de-conducir-delete-dialog.component';
import { CarnetDeConducirService } from 'app/entities/carnet-de-conducir/carnet-de-conducir.service';

describe('Component Tests', () => {
  describe('CarnetDeConducir Management Delete Component', () => {
    let comp: CarnetDeConducirDeleteDialogComponent;
    let fixture: ComponentFixture<CarnetDeConducirDeleteDialogComponent>;
    let service: CarnetDeConducirService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [CarnetDeConducirDeleteDialogComponent]
      })
        .overrideTemplate(CarnetDeConducirDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CarnetDeConducirDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CarnetDeConducirService);
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
