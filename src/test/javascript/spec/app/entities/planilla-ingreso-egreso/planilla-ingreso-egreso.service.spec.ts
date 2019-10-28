import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PlanillaIngresoEgresoService } from 'app/entities/planilla-ingreso-egreso/planilla-ingreso-egreso.service';
import { IPlanillaIngresoEgreso, PlanillaIngresoEgreso } from 'app/shared/model/planilla-ingreso-egreso.model';

describe('Service Tests', () => {
  describe('PlanillaIngresoEgreso Service', () => {
    let injector: TestBed;
    let service: PlanillaIngresoEgresoService;
    let httpMock: HttpTestingController;
    let elemDefault: IPlanillaIngresoEgreso;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PlanillaIngresoEgresoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new PlanillaIngresoEgreso(0, false, 0, currentDate, currentDate, 'AAAAAAA', false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaIngreso: currentDate.format(DATE_TIME_FORMAT),
            fechaEgreso: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a PlanillaIngresoEgreso', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaIngreso: currentDate.format(DATE_TIME_FORMAT),
            fechaEgreso: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaIngreso: currentDate,
            fechaEgreso: currentDate
          },
          returnedFromService
        );
        service
          .create(new PlanillaIngresoEgreso(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a PlanillaIngresoEgreso', () => {
        const returnedFromService = Object.assign(
          {
            autorizadoPrevio: true,
            acompaniantes: 1,
            fechaIngreso: currentDate.format(DATE_TIME_FORMAT),
            fechaEgreso: currentDate.format(DATE_TIME_FORMAT),
            tipovisita: 'BBBBBB',
            ingresoAPie: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaIngreso: currentDate,
            fechaEgreso: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of PlanillaIngresoEgreso', () => {
        const returnedFromService = Object.assign(
          {
            autorizadoPrevio: true,
            acompaniantes: 1,
            fechaIngreso: currentDate.format(DATE_TIME_FORMAT),
            fechaEgreso: currentDate.format(DATE_TIME_FORMAT),
            tipovisita: 'BBBBBB',
            ingresoAPie: true
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaIngreso: currentDate,
            fechaEgreso: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a PlanillaIngresoEgreso', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
