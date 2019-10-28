import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SbriglioTestModule } from '../../../test.module';
import { QRDetailComponent } from 'app/entities/qr/qr-detail.component';
import { QR } from 'app/shared/model/qr.model';

describe('Component Tests', () => {
  describe('QR Management Detail Component', () => {
    let comp: QRDetailComponent;
    let fixture: ComponentFixture<QRDetailComponent>;
    const route = ({ data: of({ qR: new QR(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SbriglioTestModule],
        declarations: [QRDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(QRDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(QRDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.qR).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
