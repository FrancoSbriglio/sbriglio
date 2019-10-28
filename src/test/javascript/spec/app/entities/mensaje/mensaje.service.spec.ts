import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { MensajeService } from 'app/entities/mensaje/mensaje.service';
import { IMensaje, Mensaje } from 'app/shared/model/mensaje.model';

describe('Service Tests', () => {
  describe('Mensaje Service', () => {
    let injector: TestBed;
    let service: MensajeService;
    let httpMock: HttpTestingController;
    let elemDefault: IMensaje;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(MensajeService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Mensaje(0, currentDate, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaHoraMensaje: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a Mensaje', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaHoraMensaje: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaHoraMensaje: currentDate
          },
          returnedFromService
        );
        service
          .create(new Mensaje(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Mensaje', () => {
        const returnedFromService = Object.assign(
          {
            fechaHoraMensaje: currentDate.format(DATE_TIME_FORMAT),
            descripcionMensaje: 'BBBBBB',
            estadoMensaje: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaHoraMensaje: currentDate
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

      it('should return a list of Mensaje', () => {
        const returnedFromService = Object.assign(
          {
            fechaHoraMensaje: currentDate.format(DATE_TIME_FORMAT),
            descripcionMensaje: 'BBBBBB',
            estadoMensaje: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaHoraMensaje: currentDate
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

      it('should delete a Mensaje', () => {
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
