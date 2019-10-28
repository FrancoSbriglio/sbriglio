import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { SeguroDetailComponent } from 'app/entities/seguro/seguro-detail.component';
import { Seguro } from 'app/shared/model/seguro.model';

describe('Component Tests', () => {
  describe('Seguro Management Detail Component', () => {
    let comp: SeguroDetailComponent;
    let fixture: ComponentFixture<SeguroDetailComponent>;
    const route = ({ data: of({ seguro: new Seguro(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [SeguroDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SeguroDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SeguroDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.seguro).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
