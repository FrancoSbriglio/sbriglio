import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { EspacioComunService } from 'app/entities/espacio-comun/espacio-comun.service';
import { IEspacioComun, EspacioComun } from 'app/shared/model/espacio-comun.model';

describe('Service Tests', () => {
  describe('EspacioComun Service', () => {
    let injector: TestBed;
    let service: EspacioComunService;
    let httpMock: HttpTestingController;
    let elemDefault: IEspacioComun;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(EspacioComunService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new EspacioComun(0, 'AAAAAAA', currentDate, currentDate, 'image/png', 'AAAAAAA', currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            disponibilidadDesde: currentDate.format(DATE_TIME_FORMAT),
            disponibilidadHasta: currentDate.format(DATE_TIME_FORMAT),
            horaDesde: currentDate.format(DATE_TIME_FORMAT),
            horaHasta: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a EspacioComun', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            disponibilidadDesde: currentDate.format(DATE_TIME_FORMAT),
            disponibilidadHasta: currentDate.format(DATE_TIME_FORMAT),
            horaDesde: currentDate.format(DATE_TIME_FORMAT),
            horaHasta: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            disponibilidadDesde: currentDate,
            disponibilidadHasta: currentDate,
            horaDesde: currentDate,
            horaHasta: currentDate
          },
          returnedFromService
        );
        service
          .create(new EspacioComun(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a EspacioComun', () => {
        const returnedFromService = Object.assign(
          {
            nombreEspacioComun: 'BBBBBB',
            disponibilidadDesde: currentDate.format(DATE_TIME_FORMAT),
            disponibilidadHasta: currentDate.format(DATE_TIME_FORMAT),
            fotoEspacioComun: 'BBBBBB',
            horaDesde: currentDate.format(DATE_TIME_FORMAT),
            horaHasta: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            disponibilidadDesde: currentDate,
            disponibilidadHasta: currentDate,
            horaDesde: currentDate,
            horaHasta: currentDate
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

      it('should return a list of EspacioComun', () => {
        const returnedFromService = Object.assign(
          {
            nombreEspacioComun: 'BBBBBB',
            disponibilidadDesde: currentDate.format(DATE_TIME_FORMAT),
            disponibilidadHasta: currentDate.format(DATE_TIME_FORMAT),
            fotoEspacioComun: 'BBBBBB',
            horaDesde: currentDate.format(DATE_TIME_FORMAT),
            horaHasta: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            disponibilidadDesde: currentDate,
            disponibilidadHasta: currentDate,
            horaDesde: currentDate,
            horaHasta: currentDate
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

      it('should delete a EspacioComun', () => {
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
