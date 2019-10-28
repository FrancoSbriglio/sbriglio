import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { ColorDetailComponent } from 'app/entities/color/color-detail.component';
import { Color } from 'app/shared/model/color.model';

describe('Component Tests', () => {
  describe('Color Management Detail Component', () => {
    let comp: ColorDetailComponent;
    let fixture: ComponentFixture<ColorDetailComponent>;
    const route = ({ data: of({ color: new Color(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [ColorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ColorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ColorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.color).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
