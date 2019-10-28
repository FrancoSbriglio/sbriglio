import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SbriglioTestModule } from '../../../test.module';
import { ColorComponent } from 'app/entities/color/color.component';
import { ColorService } from 'app/entities/color/color.service';
import { Color } from 'app/shared/model/color.model';

describe('Component Tests', () => {
  describe('Color Management Component', () => {
    let comp: ColorComponent;
    let fixture: ComponentFixture<ColorComponent>;
    let service: ColorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [ColorComponent],
        providers: []
      })
        .overrideTemplate(ColorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ColorComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ColorService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Color(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.colors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
