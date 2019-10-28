import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { ArtDetailComponent } from 'app/entities/art/art-detail.component';
import { Art } from 'app/shared/model/art.model';

describe('Component Tests', () => {
  describe('Art Management Detail Component', () => {
    let comp: ArtDetailComponent;
    let fixture: ComponentFixture<ArtDetailComponent>;
    const route = ({ data: of({ art: new Art(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [ArtDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ArtDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ArtDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.art).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
