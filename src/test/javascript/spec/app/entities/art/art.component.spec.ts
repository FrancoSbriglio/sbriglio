import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SbriglioTestModule } from '../../../test.module';
import { ArtComponent } from 'app/entities/art/art.component';
import { ArtService } from 'app/entities/art/art.service';
import { Art } from 'app/shared/model/art.model';

describe('Component Tests', () => {
  describe('Art Management Component', () => {
    let comp: ArtComponent;
    let fixture: ComponentFixture<ArtComponent>;
    let service: ArtService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [ArtComponent],
        providers: []
      })
        .overrideTemplate(ArtComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArtComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ArtService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Art(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.arts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
