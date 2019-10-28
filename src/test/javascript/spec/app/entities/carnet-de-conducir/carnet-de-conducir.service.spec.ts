import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CarnetDeConducirService } from 'app/entities/carnet-de-conducir/carnet-de-conducir.service';
import { ICarnetDeConducir, CarnetDeConducir } from 'app/shared/model/carnet-de-conducir.model';

describe('Service Tests', () => {
  describe('CarnetDeConducir Service', () => {
    let injector: TestBed;
    let service: CarnetDeConducirService;
    let httpMock: HttpTestingController;
    let elemDefault: ICarnetDeConducir;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(CarnetDeConducirService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new CarnetDeConducir(0, 'AAAAAAA', currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaOtorgamiento: currentDate.format(DATE_TIME_FORMAT),
            fechaVencimiento: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a CarnetDeConducir', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaOtorgamiento: currentDate.format(DATE_TIME_FORMAT),
            fechaVencimiento: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaOtorgamiento: currentDate,
            fechaVencimiento: currentDate
          },
          returnedFromService
        );
        service
          .create(new CarnetDeConducir(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a CarnetDeConducir', () => {
        const returnedFromService = Object.assign(
          {
            categoria: 'BBBBBB',
            fechaOtorgamiento: currentDate.format(DATE_TIME_FORMAT),
            fechaVencimiento: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaOtorgamiento: currentDate,
            fechaVencimiento: currentDate
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

      it('should return a list of CarnetDeConducir', () => {
        const returnedFromService = Object.assign(
          {
            categoria: 'BBBBBB',
            fechaOtorgamiento: currentDate.format(DATE_TIME_FORMAT),
            fechaVencimiento: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaOtorgamiento: currentDate,
            fechaVencimiento: currentDate
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

      it('should delete a CarnetDeConducir', () => {
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
