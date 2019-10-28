import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { EspacioComunDetailComponent } from 'app/entities/espacio-comun/espacio-comun-detail.component';
import { EspacioComun } from 'app/shared/model/espacio-comun.model';

describe('Component Tests', () => {
  describe('EspacioComun Management Detail Component', () => {
    let comp: EspacioComunDetailComponent;
    let fixture: ComponentFixture<EspacioComunDetailComponent>;
    const route = ({ data: of({ espacioComun: new EspacioComun(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [EspacioComunDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EspacioComunDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EspacioComunDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.espacioComun).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
