import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ConvertFormComponent } from '@components/convert-form/convert-form.component';
import { FileChipComponent } from '@components/file-chip/file-chip.component';
import { LoadingService } from '@services/loading/loading.service';
import { PdfService } from '@services/pdf/pdf.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let mockPdfService: jasmine.SpyObj<PdfService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const pdfServiceSpy = jasmine.createSpyObj('PdfService',
      ['getConvertedFileById', 'deleteConvertedFileById', 'convert', 'fetchConvertedFilesList'],
    );
    const loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['setLoadingState']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    Object.defineProperties(pdfServiceSpy, {
      convertedFilesList: {
        get: () => of([fileMock]),
      },
    });

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        { provide: PdfService, useValue: pdfServiceSpy },
        { provide: LoadingService, useValue: loadingServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockPdfService = TestBed.inject(PdfService) as jasmine.SpyObj<PdfService>;
    mockToastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Text to PDF');
  });

  it('should render app-loader', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-loader')).toBeTruthy();
  });

  it('should render ngx-extended-pdf-viewer if current file exists', () => {
    mockPdfService.convert.and.returnValue(of(fileMock));
    component.currentFile.set(fileMock);
    component.onConvert('test');
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('ngx-extended-pdf-viewer')).toBeTruthy();
  });

  it('should not render ngx-extended-pdf-viewer if current file does not exist', () => {
    component.currentFile.set(null);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('ngx-extended-pdf-viewer')).toBeFalsy();
  });

  it('should call onConvert when convertEvent is emitted', () => {
    const compiled = fixture.debugElement;
    spyOn(component, 'onConvert');
    compiled.query(By.directive(ConvertFormComponent)).triggerEventHandler('convertEvent', 'txt');
    expect(component.onConvert).toHaveBeenCalled();
  });

  it('should call onViewFile when viewEvent is emitted', () => {
    const compiled = fixture.debugElement;
    spyOn(component, 'onViewFile');
    compiled.query(By.directive(FileChipComponent)).triggerEventHandler('viewEvent', null);
    expect(component.onViewFile).toHaveBeenCalled();
  });

  it('should call onDeleteFile when deleteEvent is emitted', () => {
    const compiled = fixture.debugElement;
    spyOn(component, 'onDeleteFile');
    compiled.query(By.directive(FileChipComponent)).triggerEventHandler('deleteEvent', null);
    expect(component.onDeleteFile).toHaveBeenCalled();
  });

  it('should view a file', () => {
    mockPdfService.getConvertedFileById.and.returnValue(of(fileMock));
    component.onViewFile(fileMock.id);
    expect(component.currentFile()).toEqual(fileMock);
  });

  it('should handle conversion error', () => {
    const testText = 'test text';
    mockPdfService.convert.and.returnValue(throwError(() => 'Error'));
    component.onConvert(testText);
    expect(mockToastrService.error).toHaveBeenCalledWith('Error converting file');
  });

  it('should handle delete file success', () => {
    mockPdfService.deleteConvertedFileById.and.returnValue(of(true));
    component.onDeleteFile(fileMock.id);
    expect(mockToastrService.success).toHaveBeenCalledWith('Converted file has been deleted.');
  });

  it('should handle delete file error', () => {
    mockPdfService.deleteConvertedFileById.and.returnValue(throwError(() => 'Error'));
    component.onDeleteFile(fileMock.id);
    expect(mockToastrService.error).toHaveBeenCalledWith('Could not delete file');
  });

  it('should reset selected file if deleted', () => {
    mockPdfService.deleteConvertedFileById.and.returnValue(of(true));
    component.currentFile.set(fileMock);
    component.onDeleteFile(fileMock.id);
    expect(component.currentFile()).toBeNull();
  });

});

const fileMock = {
  id: 1,
  createdAt: new Date().toISOString(),
  file: new Blob(),
};

