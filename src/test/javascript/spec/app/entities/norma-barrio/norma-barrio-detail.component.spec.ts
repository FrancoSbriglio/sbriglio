import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { NormaBarrioDetailComponent } from 'app/entities/norma-barrio/norma-barrio-detail.component';
import { NormaBarrio } from 'app/shared/model/norma-barrio.model';

describe('Component Tests', () => {
  describe('NormaBarrio Management Detail Component', () => {
    let comp: NormaBarrioDetailComponent;
    let fixture: ComponentFixture<NormaBarrioDetailComponent>;
    const route = ({ data: of({ normaBarrio: new NormaBarrio(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [NormaBarrioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NormaBarrioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NormaBarrioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.normaBarrio).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
