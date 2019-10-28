import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SbriglioTestModule } from '../../../test.module';
import { ListaAmigosDeleteDialogComponent } from 'app/entities/lista-amigos/lista-amigos-delete-dialog.component';
import { ListaAmigosService } from 'app/entities/lista-amigos/lista-amigos.service';

describe('Component Tests', () => {
  describe('ListaAmigos Management Delete Component', () => {
    let comp: ListaAmigosDeleteDialogComponent;
    let fixture: ComponentFixture<ListaAmigosDeleteDialogComponent>;
    let service: ListaAmigosService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [ListaAmigosDeleteDialogComponent]
      })
        .overrideTemplate(ListaAmigosDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ListaAmigosDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ListaAmigosService);
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
