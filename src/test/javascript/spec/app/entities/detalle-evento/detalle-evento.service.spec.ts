import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { DetalleEventoService } from 'app/entities/detalle-evento/detalle-evento.service';
import { IDetalleEvento, DetalleEvento } from 'app/shared/model/detalle-evento.model';

describe('Service Tests', () => {
  describe('DetalleEvento Service', () => {
    let injector: TestBed;
    let service: DetalleEventoService;
    let httpMock: HttpTestingController;
    let elemDefault: IDetalleEvento;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(DetalleEventoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new DetalleEvento(0, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            horaIngreso: currentDate.format(DATE_TIME_FORMAT),
            horaEngreso: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a DetalleEvento', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            horaIngreso: currentDate.format(DATE_TIME_FORMAT),
            horaEngreso: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            horaIngreso: currentDate,
            horaEngreso: currentDate
          },
          returnedFromService
        );
        service
          .create(new DetalleEvento(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a DetalleEvento', () => {
        const returnedFromService = Object.assign(
          {
            horaIngreso: currentDate.format(DATE_TIME_FORMAT),
            horaEngreso: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            horaIngreso: currentDate,
            horaEngreso: currentDate
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

      it('should return a list of DetalleEvento', () => {
        const returnedFromService = Object.assign(
          {
            horaIngreso: currentDate.format(DATE_TIME_FORMAT),
            horaEngreso: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            horaIngreso: currentDate,
            horaEngreso: currentDate
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

      it('should delete a DetalleEvento', () => {
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
