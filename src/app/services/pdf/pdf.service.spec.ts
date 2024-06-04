import { HttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { of } from 'rxjs';

import { PdfService } from './pdf.service';


describe('PdfService', () => {
  let service: PdfService;
  let httpClientSpy: { post: jasmine.Spy };
  let ngxIndexedDBSpy: { add: jasmine.Spy, getAll: jasmine.Spy, getByID: jasmine.Spy, deleteByKey: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    ngxIndexedDBSpy = jasmine.createSpyObj('NgxIndexedDBService', ['add', 'getAll', 'getByID', 'deleteByKey']);

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideHttpClientTesting(),
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: NgxIndexedDBService, useValue: ngxIndexedDBSpy },
        PdfService,
      ],
    });

    service = TestBed.inject(PdfService);
  });

  afterEach(() => {
    // Verify that none of the tests make any extra HTTP requests.
    TestBed.inject(HttpTestingController).verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#convert should convert text to pdf using http request', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(new Blob()));
    ngxIndexedDBSpy.add.and.returnValue(of(convertedFileMock));

    service.convert('hello')
      .subscribe({
        next: (response) => {
          expect(response).toEqual(convertedFileMock);
          done();
        },
        error: done.fail,
      });

    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  it('#fetchConvertedFilesList should fetch list of all converted files', (done: DoneFn) => {
    ngxIndexedDBSpy.getAll.and.returnValue(of([convertedFileMock]));

    service.fetchConvertedFilesList();

    service.convertedFilesList
      .subscribe({
        next: (response) => {
          expect(response).toEqual([convertedFileMock]);
          done();
        },
        error: done.fail,
      });
  });

  it('#getConvertedFileById should return specific converted file by id', (done: DoneFn) => {
    ngxIndexedDBSpy.getByID.and.returnValue(of(convertedFileMock));

    service.getConvertedFileById(1)
      .subscribe({
        next: (response) => {
          expect(response).toEqual(convertedFileMock);
          done();
        },
        error: done.fail,
      });
  });

  it('#deleteConvertedFileById should delete specific converted file by id', (done: DoneFn) => {
    ngxIndexedDBSpy.deleteByKey.and.returnValue(of(true));

    service.deleteConvertedFileById(1)
      .subscribe({
        next: (response) => {
          expect(response).toEqual(true);
          done();
        },
        error: done.fail,
      });
  });
});

const convertedFileMock = {
  id: 1,
  createdAt: '2024-06-04T11:45:52.861Z',
  file: new Blob(),
};
