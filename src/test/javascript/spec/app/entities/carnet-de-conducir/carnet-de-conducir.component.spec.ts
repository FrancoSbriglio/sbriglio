import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SbriglioTestModule } from '../../../test.module';
import { CarnetDeConducirComponent } from 'app/entities/carnet-de-conducir/carnet-de-conducir.component';
import { CarnetDeConducirService } from 'app/entities/carnet-de-conducir/carnet-de-conducir.service';
import { CarnetDeConducir } from 'app/shared/model/carnet-de-conducir.model';

describe('Component Tests', () => {
  describe('CarnetDeConducir Management Component', () => {
    let comp: CarnetDeConducirComponent;
    let fixture: ComponentFixture<CarnetDeConducirComponent>;
    let service: CarnetDeConducirService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [CarnetDeConducirComponent],
        providers: []
      })
        .overrideTemplate(CarnetDeConducirComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CarnetDeConducirComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CarnetDeConducirService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CarnetDeConducir(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.carnetDeConducirs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
